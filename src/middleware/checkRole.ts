/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-07 17:24:02
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-07 23:43:19
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

        const userRoles: Array<string> = user.role.split(';') || [];

        // check each required role
        for(const requiredRole of roles) {
            // if user is missing a role
            if(!userRoles.includes(requiredRole)) {
                res.status(401).json({
                    status: 'PERMISSION_DENIED'
                });
                return;
            }
        }

        // user has all required roles
        // continue with controller/middleware
        next();
    };
};