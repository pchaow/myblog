import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Cat {

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name : string;

    @Column()
    color : string;

    @Column()
    description : string;

}