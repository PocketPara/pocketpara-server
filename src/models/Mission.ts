/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-10 18:19:36
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-10 22:58:50
 * @ Description: Model definition for missions
 */
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, ManyToMany } from 'typeorm';
import { Shift } from './Shift';
import { Keyword } from './Keyword';
import { MedicalCategory } from './MedicalCategory';
import { UserEvent } from './UserEvent';

@Entity()
export class Mission {

    // Primary key
    @PrimaryGeneratedColumn()
    id: number;

    // the shift id
    @ManyToOne( type => Shift )
    @JoinColumn()
    user: Shift;

    // the keyword id
    @ManyToOne( type => Keyword )
    @JoinColumn()
    keyword: Keyword;

    // the medical category assigned to the mission
    @ManyToOne( type => MedicalCategory )
    @JoinColumn()
    medicalCategory: MedicalCategory;

    //ENCRYPTED: The text of the alarm
    @Column({ default: "" })
    alarmtext: string;

    @Column({ default: "" })
    improvementNotes: string;

    @ManyToMany( type => UserEvent )
    @JoinColumn()
    userEvents: UserEvent[];
    

}