/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-09 19:55:56
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-09 22:02:00
 * @ Description: Car-controller (user-defined ones)
 */
import { Request, Response } from 'express';
import { getRepository } from 'typeorm'
import { validate } from 'class-validator';
import { Car } from "../models/Car";
import { User } from "../models/User";

class CarController {
    
    static add = async (req: Request, res: Response) => {

        // Check if required information was sent
        const { code, description, order } = req.body;

        // Get the user's id from jwt
        const id: number = res.locals.jwtPayload.userId;
        
        // only code is required to be passed,
        // description will default to ""
        if(!(code)) {
            // The data was not passed properly,
            // send bad request
            res.status(400).json({
                status: 'BAD_REQUEST'
            });
            return;
        }

        // Initialize a new car
        let car: Car = new Car();

        // Get the user that wants to create the car
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch(error) {
            res.status(404).json({ status: 'USER_NOT_FOUND'});
            return;
        }

        // user was found at this point
        // assign the values to the new car
        car.code = code;
        car.description = description || "";
        car.user = user;
        car.order = order || 0;

        // Make sure the data is valid
        const errors = await validate(car);
        if(errors.length > 0) {
            // errors occured, abort
            res.status(400).json({
                status: 'BAD_REQUEST',
                errors
            });
            return;
        }

        // Data is valid here
        const carRepository = getRepository(Car);
        try {
            await carRepository.save(car);
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
            car: {
                code: car.code,
                description: car.description,
                id: car.id,
                order: car.order
            }
        }); 

    }

    static listCurrentUser = async (req: Request, res: Response) => {

        // Get the user's id from the jwt
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

        // Get the cars from the database
        const carRepository = getRepository(Car);
        let cars: Car[];
        try {
            cars = await carRepository.find({
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

        // Cars were found at this point
        res.status(200).json({
            status: 'SUCCESS',
            cars
        });

    };

    static edit = async (req: Request, res: Response) => {

        // Get the id from the url
        const carId = req.params.id;

        // Get the user's id from the jwt
        const id: number= res.locals.jwtPayload.userId;

        // Get new values from body
        const {
            code,
            description,
            order
        } = req.body;

        // Attempt to find the user in the db
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch(error) {
            // Not found, send 404
            res.status(404).json({ status: 'USER_NOT_FOUND' });
            return;
        }

        // user was found at this point,
        // now search for the car, with the user as filter
        // to make sure it's the owner of the car
        const carRepository = getRepository(Car);
        let car: Car;
        try {
            car = await carRepository.findOneOrFail({
                where: {
                    id: carId,
                    user
                }
            });
        } catch(error) {
            // not found, or not the user's
            res.status(404).json({
                status: 'CAR_NOT_FOUND'
            });
            return;
        }

        // Car found at this point
        // assign new values
        car.code = code || car.code;
        car.description = description || car.description;
        car.order = order || car.order;

        // Validate new values on model
        const errors = await validate(car);
        if(errors.length > 0) {
            res.status(400).json({
                status: 'BAD_REQUEST',
                errors
            });
            return;
        }

        // Attempt to save
        try {
            await carRepository.save(car);
        } catch(error) {
            // Unknown error...
            res.status(500).json({
                status: 'INTERNAL_SERVER_ERROR'
            });
            return;
        }

        // Success
        res.status(200).json({
            status: 'SUCCESS',
            car: {
                code: car.code,
                description: car.description,
                id: car.id,
                order: car.order
            }
        });

    }

    static delete = async (req: Request, res: Response) => {

        // Get the id from the url
        const carId = req.params.id;

        // Get the user's id from the jwt
        const id: number = res.locals.jwtPayload.userId;

        // Find the user
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

        // Find the car
        const carRepository = getRepository(Car);
        let car: Car;

        // Filter for user & car id to make sure the user
        // is the owner
        try {
            car = await carRepository.findOneOrFail({
                where: {
                    user,
                    id: carId
                }
            });
        } catch(error) {
            // no matching car found or user has no permission
            res.status(404).json({
                status: 'CAR_NOT_FOUND'
            });
            return;
        }

        // car was found, delete it
        carRepository.delete(carId);

        // send success
        res.status(200).json({
            status: 'SUCCESS'
        });

    };

}

export default CarController;