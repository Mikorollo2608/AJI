import {Entity, PrimaryGeneratedColumn, Column, Check, ManyToOne, JoinColumn} from "typeorm"
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

    @Column({name:"unit_price", type:"float", nullable:false})
    unitPrice: number

    @Column({name:"unit_weight",type:"float", nullable:false})
    unitWeight: number

    @ManyToOne(() => Category)
    @JoinColumn({name:"category_id"})
    category: Category
}
