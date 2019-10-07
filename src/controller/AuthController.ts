/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-07 17:49:20
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-07 23:19:23
 * @ Description: Authentication (jwt) controller
 */
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { validate, ValidationError } from 'class-validator';

import { User } from "../models/User";
import config from "../config/config";

class AuthController {

    static login = async(req: Request, res: Response) => {

        // Check if username and password are set
        const { username, password } = req.body;
        if(!(username && password)) {
            // Send bad request response
            res.status(400).json( { status: 'BAD_REQUEST' } );
            return;
        }

        // Fetch user from database
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail({ where: { username }});
        } catch( error ) {
            // user was not found
            res.status(401).json( { status: 'USER_NOT_FOUND' } );
            return;
        }

        // Check if password matches
        if(!user.validateUnencryptedPassword(password)) {
            // Invalid password
            res.status(401).json( { status: 'INVALID_PASSWORD' } );
            return;
        }

        // Sign JWT, valid for session-duration (config)
        const token: string = jwt.sign(
            { userId: user.id, username: user.username },
            config.jwtSecret,
            { expiresIn: config.sessionDuration }  
        );

        // Send the new JWT as response
        res.send(token);
    };
    

    static changePassword = async(req: Request, res: Response) => {

        // Get user id from jwt
        const id = res.locals.jwtPayload.userId;

        // Get parameters from request body
        const { oldPassword, newPassword } = req.body;
        if(!(oldPassword && newPassword)) {
            res.status(400).json( { status: 'INVALID_PASSWORD' } );
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
        res.status(204).send();
    };

}

export default AuthController;