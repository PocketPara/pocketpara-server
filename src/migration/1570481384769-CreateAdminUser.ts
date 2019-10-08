/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-07 22:49:44
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-08 14:18:11
 * @ Description: Migration script for creating the initial admin account
 */

import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { User } from "../models/User";


export class CreateAdminUser1570481384769 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        let user: User = new User();
        user.username = "admin";
        user.email = "_admin_";
        user.fullname = "Administrator";
        user.creationIp = "127.0.0.1";
        user.setPassword("admin");
        user.role = "ADMIN";
        user.isVerified = true;
        
        const userRepository = getRepository(User);
        await userRepository.save(user);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
