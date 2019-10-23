/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-10 19:47:51
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-23 22:38:32
 * @ Description: Controller for handling medical categories
 */
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { MedicalCategory } from '../models/MedicalCategory';

class MedicalCategoryController {

    static listLanguage = async (req: Request, res: Response) => {

        let langCode: string = req.params.language;

        // fallback/default is english
        if(langCode == null) {
            langCode = 'en';
        }

        // validate language code
        if(!(typeof langCode === 'string' && langCode.length === 2)) {
            res.status(400).json({
                status: 'BAD_REQUEST'
            });
            return;
        }

        // fetch the items from the db
        const medicalCategoryRepository = getRepository(MedicalCategory);
        let medicalCategories: MedicalCategory[];
        try {
            medicalCategories = await medicalCategoryRepository.find({
                where: {
                    language: langCode
                },
                // order alphabetically
                order: {
                    title: 'ASC'
                },
                // no need to search the language again
                select: ["id","title","color"]
            });
        } catch(error) {
            res.status(500).json({
                status: 'INTERNAL_SERVER_ERROR'
            });
            console.error(error);
            return;
        }

        // if there is nothing in the db, there is no localisation
        if(medicalCategories.length === 0) {
            res.status(400).json({
                status: 'UNKNOWN_LANGUAGE'
            });
            return;
        }
        

        // Send data
        res.status(200).json({
            status: 'SUCCESS',
            medicalCategories
        });


    };

}

export default MedicalCategoryController;