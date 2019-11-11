/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-10 23:01:05
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-11-11 20:01:40
 * @ Description: Controller for user-defined events 
 */

import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User";
import { UserEvent } from "../models/UserEvent";
import { validate } from "class-validator";

class UserEventController {

    static add = async (req: Request, res: Response) => {

        // Get data from body
        const { name, order } = req.body;

        // Get the user's id from the jwt
        const id: number = res.locals.jwtPayload.userId;

        // Only name is required, check if it was set
        if(!(name)) {
            res.status(400).json({ status: 'BAD_REQUEST' });
            return;
        }

        // Serach for the user
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch(error) {
            res.status(404).json({ status: 'USER_NOT_FOUND' });
            return;
        }

        // Initialize a new userevent
        let userEvent: UserEvent = new UserEvent();

        // assign values
        userEvent.name = name;
        userEvent.user = user;
        userEvent.order = order || Date.now();

        // make sure data is valid
        const errors = await validate(userEvent);
        if(errors.length > 0) {
            // error
            res.status(400).json({
                status: 'BAD_REQUEST'
            });
            return;
        }

        // Data is valid, try to insert
        const userEventRepository = getRepository(UserEvent);
        try {
            await userEventRepository.save(userEvent);
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
            userEvent: {
                name: userEvent.name,
                order: userEvent.order,
                id: userEvent.id
            }
        });


    };

    static listCurrentUser = async (req: Request, res: Response) => {

        // Get the user's id from the jwt
        const id: number = res.locals.jwtPayload.userId;

        // Get the user from the db
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

        // Get the events from the database
        const userEventRepository = getRepository(UserEvent);
        let userEvents: UserEvent[];
        try {
            userEvents = await userEventRepository.find({
                where: {
                    user
                },
                order: {
                    order: 'ASC',
                    name: 'ASC'
                }
            });
        } catch(error)  {
            res.status(500).json({
                status: 'INTERNAL_SERVER_ERROR'
            });
            console.error(error);
            return;
        }

        // User events were found!
        res.status(200).json({
            status: 'SUCCESS',
            userEvents
        });

    };

    static edit = async (req: Request, res: Response) => {

        // Get the id from the url
        const userEventId = req.params.id;

        // Get the users id from jwt
        const id: number = res.locals.jwtPayload.userId;

        // Get new values from body
        const {
            name,
            order,
            active
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

        // user found, now search for the event
        const userEventRepository = getRepository(UserEvent);
        let userEvent: UserEvent;
        try {
            userEvent = await userEventRepository.findOneOrFail({
                where: {
                    id: userEventId,
                    user
                }
            });
        } catch(error) {
            // not found, or not the user's
            res.status(404).json({
                status: 'EVENT_NOT_FOUND'
            });
            return;
        }

        // Event was found,
        // assign new values
        userEvent.name = name || userEvent.name;
        userEvent.order = order || userEvent.order;
        if(active != null) {
            userEvent.active = active;
        }

        // Validate new values on model
        const errors = await validate(userEvent);
        if(errors.length > 0) {
            res.status(400).json({
                status: 'BAD_REQUEST',
                errors
            });
            return;
        }

        // attempt to save
        try {
            await userEventRepository.save(userEvent);
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
            userEvent: {
                id: userEvent.id,
                name: userEvent.name,
                order: userEvent.order,
                active: userEvent.active
            }
        });


    };

    static delete = async (req: Request, res: Response) => {
        
        // Get the event id from the url
        const userEventId = req.params.id;

        // Get the user's id from the jwt
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

        // user found, now search for the event
        const userEventRepository = getRepository(UserEvent);
        let userEvent: UserEvent;
        try {
            userEvent = await userEventRepository.findOneOrFail({
                where: {
                    id: userEventId,
                    user
                }
            });
        } catch(error) {
            // not found, or not the user's
            res.status(404).json({
                status: 'EVENT_NOT_FOUND'
            });
            return;
        }

        // event found, delete
        userEventRepository.delete(userEventId);

        res.status(200).json({
            status: 'SUCCESS'
        });


    };
}

export default UserEventController;