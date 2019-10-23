/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-10 19:25:02
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-23 22:16:36
 * @ Description: Migration script for loading the default medical categories 
 *                from the JSON into the database
 */

import {MigrationInterface, QueryRunner, getRepository} from "typeorm";
import { MedicalCategory } from "../models/MedicalCategory";
import * as defaults_MedicalCategory from "../static/defaults_MedicalCategory.json";

export class CreateStaticsMedicalCategory1570728302117 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

        let medCats: MedicalCategory[] = [];
        for(const category of defaults_MedicalCategory.entries) {
            let newCat = new MedicalCategory();
            newCat.language = category.language;
            newCat.title = category.title;
            newCat.color = category.color;
            medCats.push(newCat);
        }

        const medCatRepository = getRepository(MedicalCategory);
        medCatRepository.insert(medCats);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
