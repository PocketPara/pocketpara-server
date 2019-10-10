/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-08 23:33:15
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-10 22:41:16
 * @ Description: Model definition for keywords
 */
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne
} from 'typeorm';
import { User } from "./User";

@Entity()
export class Keyword {

    // The identifier
    @PrimaryGeneratedColumn()
    id: number;

    // The user that uses this keyword
    @ManyToOne( type => User )
    @JoinColumn()
    user: User;

    // The name of the keyword (e.g. r2na, A2, etc.)
    @Column()
    name: string;

    // The color of the keyword
    @Column({ default: '#232323' })
    color: string;

    @Column({ default: true })
    isEmergency: boolean;

    // A description for the keyword (e.g. Emergency, O2-Transport etc.)
    @Column({ nullable: true })
    description: string;

    // Defines how they are ordered for the user
    @Column({nullable: true, default: 0 })
    order: number;
};