/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-07 22:49:44
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-07 23:50:22
 * @ Description: Migration script for creating the initial admin account
 */

import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { User } from "../models/User";


export class CreateAdminUser1570481384769 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        let user = new User();
        user.username = "admin";
        user.email = "_admin_";
        user.setPassword("admin");
        user.role = "ADMIN";
        user.isVerified = true;
        
        const userRepository = getRepository(User);
        await userRepository.save(user);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
