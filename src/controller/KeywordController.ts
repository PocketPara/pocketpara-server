/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-08 23:41:56
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-10 18:18:00
 * @ Description: Keyword-controller (user-defined ones)
 */
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';
import { Keyword } from "../models/Keyword";
import { User } from "../models/User";

class KeywordController {

    static add = async (req: Request, res: Response) => {

        // Check if required information was sent
        const { name, description, order, color } = req.body;
        // Get user's id from the jwt
        const id: number = res.locals.jwtPayload.userId;
    
        // Only name is required,
        // description will default to ""
        if(!(name)) {
            // The data was not passed properly,
            // send bad request
            res.status(400).json({ status: 'BAD_REQUEST' });
            return;
        }

        
        // Get the user that wants to create the keyword
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch(error) {
            res.status(404).json({ status: 'USER_NOT_FOUND' });
            return;
        }

        // Initialize a new keyword
        let keyword: Keyword = new Keyword();
        
        
        // user was found at this point
        // assign the values to the new keyword
        keyword.description = description || "";
        keyword.name = name;
        keyword.user = user;
        keyword.order = order || 0;
        keyword.color = color || '#232323';

        // make sure the data is valid
        const errors = await validate(keyword);
        if(errors.length > 0) {
            // error
            res.status(400).json({
                status: 'BAD_REQUEST',
                errors
            });
            return;
        }

        // Data is valid at this point
        const keywordRepository = getRepository(Keyword);
        try {
            await keywordRepository.save(keyword);
        } catch(error) {
            res.status(500).json({
                status: 'INTERNAL_SERVER_ERROR'
            });
            console.error(error);
            return;
        }

        // Everything worked, send 201 (created)
        res.status(201).json({
            status: 'SUCCESS',
            keyword: {
                name: keyword.name,
                description: keyword.description,
                id: keyword.id,
                color: keyword.color,
                order: keyword.order
            }
        });
    

    };

    static listCurrentUser = async (req: Request, res: Response) => {

        // Get user's id from the jwt
        const id: number = res.locals.jwtPayload.userId;

        // Get the user from the database
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch(error) {
            res.status(404).json({
                status: 'USER_NOT_FOUND'
            });
            return;
        }

        // Get the keywords from the database
        const keywordRepository = getRepository(Keyword);
        let keywords: Keyword[];
        try {
            keywords = await keywordRepository.find({
                where: {
                    user
                }
            });
        } catch(error) {
            res.status(500).json({
                status: 'INTERNAL_SERVER_ERROR'
            });
            console.error(error);
            return;
        }

        // Keywords were found at this point
        res.status(200).json({
            status: 'SUCCESS',
            keywords
        });


    };

    static edit = async (req: Request, res: Response) => {

        // Get id from the url
        const keywordId = req.params.id;

        // Get user's id from the jwt
        const id: number = res.locals.jwtPayload.userId;

        // Get new values from body
        const {
            name,
            description,
            order,
            color
        } = req.body;

        // Attempt to find the user in the db
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch(error) {
            // Not found, send 404 response
            res.status(404).json({ status: 'USER_NOT_FOUND'});
            return;
        }

        // user was found at this point, now search for the keyword
        // note: Also add user to query, to verify it's the owner
        const keywordRepository = getRepository(Keyword);
        let keyword: Keyword;
        try {
            keyword = await keywordRepository.findOneOrFail({
                where: {
                    id: keywordId,
                    user
                }
            });
        } catch(error) {
            // not found, or its not the user's
            res.status(404).json({
                status: 'KEYWORD_NOT_FOUND'
            });
            return;
        }

        // Keyword found at this point
        // assign new values
        keyword.name = name || keyword.name;
        keyword.description = description || keyword.description;
        keyword.order = order || keyword.order;
        keyword.color = color || keyword.color;

        // Validate new values on model
        const errors = await validate(keyword);
        if(errors.length > 0) {
            res.status(400).json({
                status: 'BAD_REQUEST',
                errors
            });
            return;
        }

        // attempt to save
        try {
            await keywordRepository.save(keyword);
        } catch(error) {
            // Unknown error, no db connection maybe?
            res.status(500).json({
                status: 'INTERNAL_SERVER_ERROR'
            });
            return;
        }

        // Success!
        res.status(200).json({
            status: 'SUCCESS',
            keyword: {
                name: keyword.name,
                description: keyword.description,
                order: keyword.order,
                color: keyword.color,
                id: keyword.id
            }
        });

    };

    static delete = async (req: Request, res: Response) => {

        // Get id from the url
        const keywordId = req.params.id;

        // Get user's id from the jwt
        const id: number = res.locals.jwtPayload.userId;

        // Find the user
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch(error) {
            res.status(404).json({ status: 'USER_NOT_FOUND' });
            return;
        }

        // Find the keyword
        const keywordRepository = getRepository(Keyword);
        let keyword: Keyword;
        // filter for user & keyword (makes sure its the user's own)
        try {
            keyword = await keywordRepository.findOneOrFail({
                where: {
                    user,
                    id: keywordId
                }
            });
        } catch(error) {
            // no matching keyword found
            res.status(404).json({
                status: 'KEYWORD_NOT_FOUND'
            });
            return;
        }

        // keyword was found
        keywordRepository.delete(keywordId);

        // send success
        res.status(200).json({
            status: 'SUCCESS'
        });

    };

}

export default KeywordController;