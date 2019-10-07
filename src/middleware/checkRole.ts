/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-07 17:24:02
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-07 23:21:20
 * @ Description: Middleware for checking a users role/permissions
 */
import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { User } from "../models/User";

export const checkRole = (roles: Array<string>) => {
    return async(req: Request, res: Response, next: NextFunction) => {
        // Get user id assigned in jwt-middleware
        const id = res.locals.jwtPayload.userId;

        // Get user role from the databse
        const userRepository = getRepository(User);
        let user: User;

        try {
            user = await userRepository.findOneOrFail(id);
        } catch(id) {
            res.status(401).json( { status: 'USER_NOT_FOUND' } );
        }

        // Check if array of authorized roles includes the user's role
        if(roles.indexOf(user.role) >= -1) {
            // User has required role, continue with next middleware/controller
            next();
        } else {
            // user doesn't have required role
            res.status(401).json( { status: 'PERMISSION_DENIED' } );
        }
    };
};