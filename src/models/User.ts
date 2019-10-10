/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-07 16:34:00
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-10 22:35:34
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
import { base64encode, base64decode } from 'nodejs-base64';
import * as bcrypt from 'bcryptjs';
import CryptoHelperAES from '../helpers/CryptoHelperAES';

@Entity()
@Unique(["username"])
@Unique(["googleIdToken"])
export class User {

    // Primary key/id
    @PrimaryGeneratedColumn()
    id: number;

    // Login username
    @Column()
    @Length(4,20)
    username: string;

    @Column({
        default: 'en'
    })
    @Length(2)
    language: string;

    @Column()
    pgpPublicKey: string;

    @Column()
    pgpPrivateKey: string;

    @Column({ nullable: true })
    pgpRevocationCertificate: string;

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
    @Length(0, 50)
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

    // Account creation ip adress
    @Column({ default: "unknown" })
    creationIp: string;

    // Last account change
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    // The IP the user logged in the last time
    @Column({ nullable: true })
    lastLoginIp: string;

    // The google-login token
    @Column({ nullable: true })
    googleIdToken: string;


    setPublicKey(publicKey: string) {
        this.pgpPublicKey = base64encode(publicKey);
    }
    getPublicKey(): string {
        return base64decode(this.pgpPublicKey);
    }

    setRevocationCertificate(revocationCertificate: string) {
        this.pgpRevocationCertificate = base64encode(revocationCertificate);
    }
    getRevocationCertificate(): string {
        return base64decode(this.pgpRevocationCertificate);
    }


    /**
     * Encrypts and saves the user's private key
     * @param {string} privateKey The new private key
     */
    setPrivateKey(privateKey: string) {
        this.pgpPrivateKey = base64encode(CryptoHelperAES.encrypt(privateKey));
    }

    /**
     * Decrypts and returns the user's private key
     */
    getPrivateKey(): string {
        return CryptoHelperAES.decrypt(base64decode(this.pgpPrivateKey));
    }

    /**
     * Hashes & sets the a password
     * @param {string} newPassword The new password (plaintext)
     */
    setPassword(newPassword: string) {
        this.password = bcrypt.hashSync(newPassword, 8);
    }

    /** Checks if a plaintext password matches the users's hashed password */
    validateUnencryptedPassword(plaintextPassword: string) {
        return bcrypt.compareSync(plaintextPassword, this.password);
    }

};