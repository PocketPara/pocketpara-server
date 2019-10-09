/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-08 23:33:15
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-09 19:58:05
 * @ Description: Model definition for keywords
 */
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne,
    Generated
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

    // A description for the keyword (e.g. Emergency, O2-Transport etc.)
    @Column({ nullable: true })
    description: string;

    // Defines how they are ordered for the user
    // FIXME: Generates invalid SQL-Statement???
    // TODO: Add controller implementation for column below
    /*@Column()
    @Generated()
    order: number;*/
};