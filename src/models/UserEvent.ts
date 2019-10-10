/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-10 22:53:33
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-10 23:24:10
 * @ Description: Model definiton for user-created events 
 *                (called UserEvent due to already-defined javascript Event)
 */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class UserEvent {

    // Primary key
    @PrimaryGeneratedColumn()
    id: number;

    // the owner
    @JoinColumn()
    @ManyToOne( type => User )
    user: User;

    //ENCRYPTED: Name of the event
    @Column()
    name: string;

    // defines how they are ordered for the user
    @Column({nullable: true, default: 0 })
    order: number;

}