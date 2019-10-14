/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-07 17:49:20
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-14 21:56:39
 * @ Description: Authentication (jwt) controller
 */
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { validate, ValidationError } from 'class-validator';

import { User } from "../models/User";
import config from "../config/config";

class AuthController {

    static register = async(req: Request, res: Response) => {
        const {
            username,
            language,
            publicKey,
            privateKey,
            revocationCert,
            email,
            fullname,
            password,
            googleIdToken
        } = req.body;

        const creationIp = <string>req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        // Check for required arguments
        if(!(username && email && password)) {
            res.status(200).json({
                status: 'BAD_REQUEST'
            });
            return;
        }
        


        // Initialize new user
        let user: User = new User();

        // Set values
        user.username = username;
        // Set language, fallback to english
        user.language = (config.permittedLangs.indexOf(language) >= 0) ? language : 'en';
        if((publicKey && privateKey)) {
            // Public key
            user.setPublicKey(publicKey);
            // Private key (encrypt first)
            user.setPrivateKey(privateKey);
            // Revocation cert
            if(revocationCert) {
                user.setRevocationCertificate(revocationCert);
            }
        }
        
        // Full name
        user.fullname = fullname || "";
        // Google token
        user.googleIdToken = googleIdToken || null;
        // Email
        user.email = email;
        // Password
        user.setPassword(password);
        // Default unverified
        user.isVerified = false;
        // TODO: send verification email here
        user.role = config.userDefaultRoles.join(';');
        // Set creation ip
        user.creationIp = creationIp;


        // Verify all data is valid
        const errors = await validate(user);
        if(errors.length > 0) {
            res.status(200).json({
                status: 'BAD_REQUEST'
            });
            return;
        }

        // Attempt to save
        const userRepository = getRepository(User);
        try {
            await userRepository.save(user);
        } catch(error) {
            res.status(200).json({
                status: 'USERNAME_TAKEN'
            });
            return;
        }

        // Everything worked, send 201
        res.status(201).json({
            status: 'SUCCESS'
        });

    };

    static login = async(req: Request, res: Response) => {

        // Check if username and password are set
        const { username, password } = req.body;
        if(!(username && password)) {
            // Send bad request response
            res.status(200).json( { status: 'BAD_REQUEST' } );
            return;
        }

        // Fetch user from database
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail({ where: { username }});
        } catch( error ) {
            // user was not found
            res.status(200).json( { status: 'USER_NOT_FOUND' } );
            return;
        }

        // Check if password matches
        if(!user.validateUnencryptedPassword(password)) {
            // Invalid password
            res.status(200).json( { status: 'INVALID_PASSWORD' } );
            return;
        }

        // Create payload for the jsonwebtoken
        const payload = {
            userId: user.id,
            username: user.username,
            fullname: user.fullname,
            isVerified: user.isVerified,
            email: user.email,
            language: user.language
        };
        // Sign JWT, valid for session-duration (config)
        const token: string = jwt.sign(
            payload,
            config.jwtSecret,
            { expiresIn: config.sessionDuration }  
        );

        // Send the new JWT as response
        res.status(200).json({
            status: 'SUCCESS',
            token,
            publicKey: user.getPublicKey(),
            privateKey: user.getPrivateKey()
        });
    };
    

    static changePassword = async(req: Request, res: Response) => {

        // Get user id from jwt
        const id = res.locals.jwtPayload.userId;

        // Get parameters from request body
        const { oldPassword, newPassword } = req.body;
        if(!(oldPassword && newPassword)) {
            res.status(400).json( { status: 'BAD_REQUEST' } );
            return;
        }

        // Get user from the databse
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch( id ) {
            res.status(401).json( { status: 'USER_NOT_FOUND' } );
            return;
        }

        // Check if old password matches
        if(!user.validateUnencryptedPassword(oldPassword)) {
            // does not match
            res.status(401).json( { status: 'INVALID_PASSWORD' } );
            return;
        }

        // Validate model / hash the password
        // Update password
        user.setPassword(newPassword);

        // Check if there were any errors
        const errors: ValidationError[] = await validate(user);
        // If an error occured
        if(errors.length > 0) {
            // Return the errors and end the request
            res.status(400).json( { status: 'BAD_REQUEST', errors } );;
            return;
        }

        // Save the updated user
        userRepository.save(user);

        // Return a success code with no content
        res.status(200).json({ status: 'SUCCESS' });
    };

}

export default AuthController;