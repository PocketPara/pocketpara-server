/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-07 16:34:00
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-07 23:11:13
 * @ Description: Model definition for Users
 */
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import { Length, IsNotEmpty } from 'class-validator';
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(["username"])
export class User {

    // Primary key/id
    @PrimaryGeneratedColumn()
    id: number;

    // Login username
    @Column()
    @Length(4,20)
    username: string;

    // Email adress
    @Column()
    @Length(4, 100)
    email: string;

    // Defines if the email is verified
    @Column({
        default: false
    })
    isVerified: boolean;

    // The time a user verified his email
    @Column({
        // can be null if user is not verified yet
        nullable: true
    })
    verifiedAt: Date;

    // The IP Adress the user verified his account from
    @Column({
        nullable: true
    })
    verifiedFrom: string;

    // The full name of a user (optional)
    @Column({
        nullable: true
    })
    @Length(4, 50)
    fullname: string;

    // User's password hash
    @Column()
    @Length(4,100)
    password: string;

    // Permission roles
    @Column()
    @IsNotEmpty()
    role: string;

    // Account creation date
    @Column()
    @CreateDateColumn()
    createdAt: Date;

    // Last account change
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    // The IP the user logged in the last time
    @Column({ nullable: true })
    lastLoginIp: string;

    /**
     * Hashes & sets the a password
     * @param {string} newPassword The new password (plaintext)
     */
    setPassword(newPassword) {
        this.password = bcrypt.hashSync(newPassword, 8);
    }

    /** Checks if a plaintext password matches the users's hashed password */
    validateUnencryptedPassword(plaintextPassword: string) {
        return bcrypt.compareSync(plaintextPassword, this.password);
    }

};