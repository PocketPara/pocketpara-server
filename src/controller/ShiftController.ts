/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-09 22:20:29
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-09 23:04:39
 * @ Description: Shift-controller (all user's shifts)
 */
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';
import { Shift } from "../models/Shift";
import { User } from "../models/User";
import { Car } from '../models/Car';

class ShiftController {

    static listProps: Array<string> = [
        "id",
        "date",
        "cycle",
        "type",
        "crew",
        "carId"
    ];

    static add = async (req: Request, res: Response) => {
        
        // Get information from body
        const {
            date,
            carId,
            cycle,
            type,
            crew
        } = req.body;

        /*
        *   crew formatting is an array of these objects:
        *   {
        *       "firstname": "test",
        *       "lastname": "example",
        *       "me": false,
        *       "role": 0 (0 driver, 1 medic, 2 doc, 3 visitor, 4 nurse, 5 in-education)
        *   }
        */

        // Get user's id from the jwt
        const id: number = res.locals.jwtPayload.userId;

        // Check for required information
        if(!(date && carId)) {
            // data was not passed properly
            res.status(400).json({ status: 'BAD_REQUEST'});
            return;
        }

        // Search for the creating user
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

        // user was found, now search for the car
        const carRepository = getRepository(Car);
        let car: Car;
        try {
            // search for id and user to make sure
            // the user actually owns the car...
            car = await carRepository.findOneOrFail({
                id: carId,
                user: user
            });
        } catch(error) {
            // Car doesn't exist or user doesn't own it...
            res.status(404).json({
                status: 'CAR_NOT_FOUND'
            });
            return;
        }

        // car was found at this point,
        // now initialize the new shift
        let shift: Shift = new Shift();

        // assign values
        shift.car = car;
        shift.user = user;
        shift.date = date;
        shift.cycle = cycle || 0;
        shift.type = type || "?";
        // If string -> direct, if array -> stringify,
        // else just default back to []
        shift.crew = (typeof crew === 'string') ? crew : (typeof crew === 'object') ? JSON.stringify(crew) : '[]';

        // Make sure everything is valid
        const errors = await validate(shift);
        if(errors.length > 0) {
            // data was faulty
            res.status(400).json({
                status: 'BAD_REQUEST',
                errors
            });
            return;
        }

        // Data is valid here
        const shiftRepository = getRepository(Shift);
        try {
            await shiftRepository.save(shift);
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
            shift: {
                id: shift.id,
                date: shift.date,
                car: shift.car,
                cycle: shift.cycle,
                type: shift.type,
                crew: shift.crew
            }
        });

        
    };

    static listCurrentUser = async (req: Request, res: Response) => {
        
        // Get user's id from the jwt
        const id: number = res.locals.jwtPayload;

        // Get user from db
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

        // Get the shifts from the database
        const shiftRepository = getRepository(Shift);
        let shifts: Shift[];
        try {
            shifts = await shiftRepository.find({
                where: {
                    user
                },
                select: <any>ShiftController.listProps
            });
        } catch(error) {
            res.status(500).json({
                status: 'INTERNAL_SERVER_ERROR'
            });
            console.error(error);
            return;
        }

        // Get car repo
        const carRepository = getRepository(Car);

        // Add cars
        for(let shift of shifts) {
            let parsedCrew;
            try {
                parsedCrew = JSON.parse(shift.crew);
            } catch(e) {
                parsedCrew = [];
            }
            shift.crew = parsedCrew;
        }

        // Shifts found, send them!
        res.status(200).json({
            status: 'SUCCESS',
            shifts
        });

    };

}

export default ShiftController;