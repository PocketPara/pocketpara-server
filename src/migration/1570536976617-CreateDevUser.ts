/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-08 14:16:16
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-10 22:13:46
 * @ Description: Migration script for creating the dev user account
 */

import {MigrationInterface, QueryRunner, getRepository} from 'typeorm';
import { User } from "../models/User";
import CryptoHelperPGP from '../helpers/CryptoHelperPGP';
import config from '../config/config';

export class CreateDevUser1570536976617 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        let user: User = new User();
        user.username = "devtest";
        user.email = "_devtest_@example.com";
        user.setPassword("devtest");
        user.fullname = "Development Account";
        user.isVerified = true;
        user.role = config.userDefaultRoles.join(';');
        user.creationIp = "127.0.0.1";

        const keySet = await CryptoHelperPGP.generateKeyPair(
            user.username, 
            user.email,
            "devtest"
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
