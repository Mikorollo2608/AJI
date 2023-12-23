import {Entity, PrimaryGeneratedColumn, Column, Check, JoinColumn, ManyToOne} from "typeorm"
import {Category} from "./Category";

@Entity()
@Check(`"unit_price" > 0`)
@Check(`"unit_weight" > 0`)
export class Product {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable:false})
    name: string

    @Column({nullable:false})
    description: string

    @Column({type:"float", nullable:false})
    unit_price: number

    @Column({type:"float", nullable:false})
    unit_weight: number

    @ManyToOne(() => Category)
    @JoinColumn()
    category: Category
}
