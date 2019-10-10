/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-07 22:49:44
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-10 22:13:29
 * @ Description: Migration script for creating the initial admin account
 */

import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { User } from "../models/User";
import CryptoHelperPGP from '../helpers/CryptoHelperPGP';
import config from '../config/config';
import Role from '../enums/Role';


export class CreateAdminUser1570481384769 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        let user: User = new User();
        user.username = "admin";
        user.email = "_admin_@example.com";
        user.fullname = "Administrator";
        user.creationIp = "127.0.0.1";
        user.setPassword("admin");
        user.role = [...config.userDefaultRoles, Role.ADMIN].join(';');
        user.isVerified = true;

        const keySet = await CryptoHelperPGP.generateKeyPair(
            user.username, 
            user.email,
            "admin"
        );
        
        user.setPrivateKey(keySet.privateKey);
        user.setPublicKey(keySet.publicKey);
        user.setRevocationCertificate(keySet.revocationCertificate);

        const userRepository = getRepository(User);
        await userRepository.save(user);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
