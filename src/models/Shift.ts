/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-09 22:12:21
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-11-11 20:57:46
 * @ Description: Model definition for shifts
 */
import {
    Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne
} from 'typeorm';
import { Car } from './Car';
import { User } from './User';

@Entity()
export class Shift {

    // Primary key
    @PrimaryGeneratedColumn()
    id: number;

    // the owner
    @ManyToOne( type => User )
    @JoinColumn()
    user: User;

    // Date of the shift
    @Column({ nullable: false })
    date: Date;

    // Car that was used
    @ManyToOne( type => Car )
    @JoinColumn()
    car: Car;

    // This doesn't create a new property
    // it just allows accessing it from
    // the controllers. The reference
    // doesn't change and is defined in car.
    @Column()
    carId: number;

    // Cycle (0 day, 1 night, 2 oncall, 3 other)
    @Column({ default: 0 })
    cycle: number;

    @Column({})
    myRole: string;

    // The crew on the car
    // Stored as JSON...
    @Column("text", { nullable: true, default: '[]'})
    crew: string;
};