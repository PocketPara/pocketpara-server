/**
 * @ Author: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Create Time: 2019-10-10 18:19:36
 * @ Modified by: Lukas Fend 'Lksfnd' <fendlukas@pm.me>
 * @ Modified time: 2019-10-10 19:23:10
 * @ Description: Model definition for missions
 */
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Shift } from './Shift';
import { Keyword } from './Keyword';

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

    //todo
    

}