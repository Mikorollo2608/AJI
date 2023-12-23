import {Entity, PrimaryGeneratedColumn, Column, Unique} from "typeorm"

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique:true, nullable:false})
    name: string
}