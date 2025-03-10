/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-07 16:34:00
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-16 12:05:19
 * @ Description: (Login-) User controller
 */
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { User } from "../models/User";

class UserController {

    static listProps: Array<string> = [
        "id", 
        "username", 
        "role", 
        "fullname", 
        "email", 
        "isVerified", 
        "verifiedAt", 
        "verifiedFrom", 
        "createdAt", 
        "updatedAt", 
        "lastLoginIp", 
        "creationIp",
        "language",
        "pgpPublicKey",
        "pgpPrivateKey",
        "pgpRevocationCertificate"
    ];

    static current = async (req: Request, res: Response) => {

        // Get user's id from the jwt
        const id: number = res.locals.jwtPayload.userId;

        // Get user repository
        const userRepository = getRepository(User);
        // attempt to find the user
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch( error ) {
            res.status(200).json({
                status: 'USER_NOT_FOUND'
            });
            return;
        }

        res.status(200).json({
            status: 'SUCCESS',
            user: {
                id: user.id,
                username: user.username,
                language: user.language,
                email: user.email,
                isVerified: user.isVerified,
                fullname: user.fullname,
                roles: user.role.split(';')
            }
        });
        
    }
    
    static listAll = async (req: Request, res: Response) => {

        // Get users from database
        const userRepository = getRepository(User);
        
        const users = await userRepository.find({
            // Filter the following arguments (no password hashes...)
            select: <any>UserController.listProps
        });

        // Send the users object
        res.status(200).json({ users });
        
    };


    static getOneById = async (req: Request, res: Response) => {
    
        // Get ID from the url
        const id = req.params.id;

        // Get the user from the database
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id, {
                // Filter the following arguments (no password hashes...)
                select: <any>UserController.listProps
            });
        } catch(error) {
            res.status(404).json( { status: 'USER_NOT_FOUND' } );
            return;
        }

        res.status(200).json({ 
            status: 'SUCCESS',
            user 
        });

    };


    static newUser = async (req: Request, res: Response) => {

        // Get parameters from body
        const { 
            username, 
            password, 
            role, 
            email, 
            isVerified,
            fullname,
            pgpPublicKey,
            pgpPrivateKey,
            pgpRevocationCertificate
        } = req.body;

        // Initialize new object from the model
        let user: User = new User();

        user.username = username;
        user.role = role || "";
        user.fullname = fullname || null;
        user.isVerified = isVerified || false;
        user.email = email;
        user.pgpPrivateKey = pgpPrivateKey;
        user.pgpPublicKey = pgpPublicKey;
        user.pgpRevocationCertificate = pgpRevocationCertificate || null;
        // Hash & set password
        user.setPassword(password);

        // Validate parameters
        const errors = await validate(user);
        if(errors.length > 0) {
            res.status(400).json({ 
                status: 'BAD_REQUEST', 
                errors 
            });
            return;
        }

        // Attempt to save
        const userRepository = getRepository(User);
        try {
            await userRepository.save(user);
        } catch(error) {
            // Send 409 (conflict)
            res.status(409).json( { status: 'USERNAME_TAKEN' } );
            return;
        }

        // Everything worked, send 201 (created)
        res.status(201).json( { status: 'SUCCESS' } );

    };

    static editCurrentUser = async(req: Request, res: Response) => {
        // Get user's id from the jwt
        const id: number = res.locals.jwtPayload.userId;

        // Get values from body
        const {
            fullname,
            email,
            language
        } = req.body;

        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch( error ) {
            res.status(200).json({
                status: 'USER_NOT_FOUND'
            });
            return;
        }

        user.fullname = fullname || user.fullname;
        user.email = email ||user.email;
        user.language = (language == 'de') ? 'de' : (language == 'en') ? 'en' : user.language;

        // Validate new values on model
        const errors = await validate(user);
        if(errors.length > 0) {
            // Errors were thrown, send an error
            res.status(200).json( { status: 'BAD_REQUEST' } );
            return;
        }

        // Attempt to save, if its fails -> username already taken
        try {
            await userRepository.save(user);
        } catch(error) {
            res.status(200).json( { status: 'USERNAME_TAKEN' } );
            return;
        }

        // Send success
        res.status(200).json( { status: 'SUCCESS' } );


    };

    static editUser = async (req: Request, res: Response) => {

        // Get id from url
        const id = req.params.id;

        // Get values from body
        const { 
            username, 
            password, 
            role, 
            email, 
            isVerified,
            fullname
        } = req.body;

        // Attempt to find user in database
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch(error) {
            // Not found, send a 404 response
            res.status(404).json( { status: 'USER_NOT_FOUND' } );
            return;
        }

        // Assign new values, fallback to initial ones
        user.username = username || user.username;
        user.setPassword(password);
        user.role = role || user.role;
        user.email = email || user.email;
        user.isVerified = isVerified || user.isVerified;
        user.fullname = fullname || user.fullname;
        
        // Validate new values on model
        const errors = await validate(user);
        if(errors.length > 0) {
            // Errors were thrown, send an error
            res.status(400).json( { status: 'BAD_REQUEST', errors } );
            return;
        }

        // Attempt to save, if its fails -> username already taken
        try {
            await userRepository.save(user);
        } catch(error) {
            res.status(409).json( { status: 'USERNAME_TAKEN' } );
            return;
        }

        // Send 204, (no content but accepted)
        res.status(200).json( { status: 'SUCCESS' } );
    };


    static deleteUser = async (req: Request, res: Response) => {

        // Get id from url
        const id = req.params.id;

        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch(error) {
            // no user found in database
            res.status(404).json( { status: 'USER_NOT_FOUND' } );
            return;
        }

        // Delete the user
        userRepository.delete(id);

        // Send success
        res.status(200).json( { status: 'SUCCESS' } );
        

    };

}

export default UserController;