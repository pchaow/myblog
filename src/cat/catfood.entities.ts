import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cat } from "./cat.entities";

@Entity()
export class CatFood extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name : string;

    @Column()
    type : string;

    @ManyToOne(() => Cat, (cat) => cat.foods)
    cat : Cat
}