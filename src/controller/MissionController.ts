/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-23 22:50:18
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-23 23:51:28
 * @ Description: Mission controller
 */
import { Request, Response } from "express";
import { getRepository, In } from "typeorm";
import { User } from "../models/User";
import { Keyword } from "../models/Keyword";
import { MedicalCategory } from "../models/MedicalCategory";
import { UserEvent } from "../models/UserEvent";
import { Mission } from "../models/Mission";
import { Shift } from "../models/Shift";
import { validate } from "class-validator";

class MissionController {

    static add = async(req: Request, res: Response) => {
        const { 
            shiftId,
            keywordId,
            keywordUpdateId,
            medicalCategoryId,
            userEventIds
            /*alarmtext,improvementNotes*/
        } = req.body;

        // Get the user's id from the session
        const id: number = res.locals.jwtPayload.userId;

        if(!(shiftId && keywordId && medicalCategoryId)) {
            res.status(400).json({status: 'BAD_REQUEST'});
            return;
        }

        // Get the user that wants to add the mission
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch(error) {
            res.status(404).json({ status: 'USER_NOT_FOUND'});
            return;
        }

        // Get keywords
        const keywordRepository = getRepository(Keyword);
        let initialKeyword: Keyword;
        let endKeyword: Keyword;
        try {
            initialKeyword = await keywordRepository.findOneOrFail({
                where: {
                    user,
                    id: keywordId
                }
            });
            endKeyword = await keywordRepository.findOneOrFail({
                where: {
                    user,
                    id: keywordUpdateId
                }
            });
        } catch(error) {
            // not found, or user doesn't own both
            res.status(404).json({
                status: 'KEYWORD_NOT_FOUND'
            });
        }

        // Get shift
        const shiftRepository = getRepository(Shift);
        let shift: Shift;
        try {
            shift = await shiftRepository.findOneOrFail({
                id: shiftId,
                user
            });
        } catch(error) {
            res.status(404).json({
                status: 'SHIFT_NOT_FOUND'
            });
            return;
        }

        // Get medical category
        const medicalCategoryRepository = getRepository(MedicalCategory);
        let medicalCategory: MedicalCategory;
        try {
            medicalCategory = await medicalCategoryRepository.findOneOrFail(medicalCategoryId);
        } catch(error) {
            res.status(404).json({
                status: 'MEDICAL_CATEGORY_NOT_FOUND'
            });
            return;
        }

        let userEvents: UserEvent[] = [];
        if(userEventIds.length > 0) {
            // Get user events
            const userEventRepository = getRepository(UserEvent);
            let orList = [];
            for(let eventId of userEventIds) {
                orList.push({
                    user, 
                    id: eventId
                });
            }
            
            try {
                userEvents = await userEventRepository.find({
                    where: orList
                });
                
            } catch( error ) {
                res.status(404).json({
                    status: 'USER_EVENT_NOT_FOUND'
                });
                return;
}
        }
        

        // Everything successful so far, so create the new mission
        let newMission = new Mission();
        newMission.keyword = initialKeyword;
        newMission.keywordUpdate = endKeyword || initialKeyword;
        newMission.medicalCategory = medicalCategory;
        newMission.shift = shift;
        newMission.userEvents = userEvents ||[];

        // Check for errors
        const errors = await validate(newMission);
        if(errors.length > 0) {
            res.status(400).json({
                status: 'BAD_REQUEST'
            });
            return;
        }

        const missionRepository = getRepository(Mission);

        // Attempt to save
        try {
            await missionRepository.save(newMission);
        } catch(error) {
            res.status(500).json({
                status: 'INTERNAL_SERVER_ERROR'
            });
            console.error(error)
            return;
        }

        // Success!
        res.status(200).json({
            status: 'SUCCESS',
            mission: newMission
        });

    };

    static list = async(req: Request, res: Response) => {
        // Get the user's id from the session
        const id: number = res.locals.jwtPayload.userId;

        // find the user
        let userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch( error ){
            res.status(404).json({
                status: 'USER_NOT_FOUND'
            });
            return;
        }

        // find all the user events
        const userEventRepository = getRepository(Mission);
        let ue;
        try {
            ue = await userEventRepository
                .createQueryBuilder('mission')
                .leftJoinAndSelect("mission.userEvents", "userEvent")
                .leftJoinAndSelect("mission.shift", "shift")
                .where("shift.user = :user", { user: user.id })
                .getMany();
        } catch(error) {
            res.status(500).json({
                status: 'BAD_REQUEST'
            });
            return;
        }
        
        for(let event of ue) {
            // Now optimize the data
            let userEventIds = [];
            const userEvents = event.userEvents;
            for(let userEvent of event.userEvents) {
                userEventIds.push(userEvent.id);
            }

            event.userEvents = userEventIds;
            event.shiftId = event.shift.id;
            event.shift = undefined;
            event.alarmtext = undefined;
            event.improvementNotes = undefined;
        }
        
        
    
        // Success!
        res.status(200).json({
            status: 'SUCCESS',
            missions: ue
        });
    };

    static edit = async(req: Request, res: Response) => {

    };

    static delete = async(req: Request, res: Response) => {

    };

}

export default MissionController;