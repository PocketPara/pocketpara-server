/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-09 19:57:30
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-09 22:01:07
 * @ Description: Model definition for cars
 */
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { User } from "./User";

@Entity()
export class Car {

    // The identifier
    @PrimaryGeneratedColumn()
    id: number;

    // The user that uses this car
    @ManyToOne( type => User)
    @JoinColumn()
    user: User;

    // The identification code of the car
    @Column()
    code: string;

    // The description of the car
    @Column({ nullable: true })
    description: string;

    // Defines how they are ordered for the user
    @Column({nullable: true, default: 0 })
    order: number;

}