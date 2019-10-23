/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-10 18:19:36
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-23 23:33:26
 * @ Description: Model definition for missions
 */
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, ManyToMany, JoinTable } from 'typeorm';
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
    shift: Shift;

    // Doesnt' create new field, just for reuests
    @Column()
    shiftId: number;

    // the keyword id
    @ManyToOne( type => Keyword )
    @JoinColumn()
    keyword: Keyword;

    // Doesnt' create new field, just for reuests
    @Column()
    keywordId: number;

    @ManyToOne( type => Keyword )
    keywordUpdate: Keyword;

    // Doesnt' create new field, just for reuests
    @Column()
    keywordUpdateId: number;

    // the medical category assigned to the mission
    @ManyToOne( type => MedicalCategory )
    @JoinColumn()
    medicalCategory: MedicalCategory;

    // Doesnt' create new field, just for reuests
    @Column()
    medicalCategoryId: number;

    //ENCRYPTED: The text of the alarm
    @Column({ default: null, nullable: true })
    alarmtext: string;

    @Column({ default: null, nullable: true })
    improvementNotes: string;

    @ManyToMany( type => UserEvent )
    @JoinTable()
    userEvents: UserEvent[];

}