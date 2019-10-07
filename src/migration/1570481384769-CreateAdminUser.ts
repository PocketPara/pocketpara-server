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
