import { Type } from 'class-transformer';
import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, BaseEntity, OneToMany, ManyToOne} from 'typeorm'
import { CatFood } from './catfood.entities';



@Entity()
export class CatProfile extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    fahter : string;
    
    @Column()
    mother : string;
}

@Entity()
export class Cat  extends BaseEntity{

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name : string;

    @Column()
    color : string;

    @Column()
    description : string;

    
    @OneToOne(() => CatProfile, {
        eager : true
    })
    @JoinColumn()
    profile : CatProfile;

    @OneToMany(() => CatFood, (catfood) => catfood.cat, {
        eager : true,
    })
    foods : CatFood[]

}
