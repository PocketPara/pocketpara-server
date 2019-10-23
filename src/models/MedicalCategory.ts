/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-10 19:18:04
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-23 22:16:03
 * @ Description: Model definition for missions
 */
import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";
import { Length } from "class-validator";


@Entity()
@Unique(["title", "language"])
export class MedicalCategory {

    // Primary key
    @PrimaryGeneratedColumn()
    id: number;

    // the name of the category
    @Column()
    title: string;

    @Column({ default: '#232323' })
    color: string;

    // the language of the word
    @Column()
    @Length(2)
    language: string;
}