/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-07 17:09:08
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-07 23:47:23
 * @ Description: Middleware for handling authorisation/jsonwebtokens
 */
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from "../config/config";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {

    // Get JWT from header
    const token: string = <string>req.headers["auth"];
    let jwtPayload;

    // Attempts token validation & fetches data
    try {
        jwtPayload = <any>jwt.verify(token, config.jwtSecret);
        // Assign the payload to the response local variables
        res.locals.jwtPayload = jwtPayload;
    } catch( error ) {
        // Invalid token, respond with 401 unauthorized
        res.status(401).json( { status: 'UNAUTHORIZED_TOKEN_ERROR' } );
        return;
    }

    // Config defines how long a token is valid (the session duration basically)
    // Send a new refreshed-token with every request
    const payload = {
        userId: jwtPayload.id,
        username: jwtPayload.username,
        fullname: jwtPayload.fullname,
        isVerified: jwtPayload.isVerified,
        email: jwtPayload.email
    };
    const newToken = jwt.sign(
        jwtPayload,
        config.jwtSecret,
        { expiresIn: config.sessionDuration }
    );

    // Send the new token in the header
    res.setHeader('token', newToken);

    // Call next middleware or controller
    next();
};