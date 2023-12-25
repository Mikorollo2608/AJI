import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Check} from "typeorm"
import {Category} from "./Category";
import {Product} from "./Product";
import {Order} from "./Order";

@Entity("order_item")
@Check(`"unit_price" > 0`)
@Check(`"unit_weight" > 0`)
@Check(`"quantity" > 0`)
export class OrderItem {

    @PrimaryGeneratedColumn()
    id: number

    @Column({name:"order_id"})
    @ManyToOne(() => Order)
    orderId: number

    @Column({nullable:false})
    name: string

    @Column({nullable:false})
    description: string

    @Column({name:"unit_price", type:"float", nullable:false})
    unitPrice: number

    @Column({name:"unit_weight",type:"float", nullable:false})
    unitWeight: number

    @ManyToOne(() => Category)
    category: Category

    @Column({type:"integer",nullable:false})
    quantity: number

    constructor(product: Product, quantity: number) {
        this.name = product.name;
        this.description = product.description;
        this.unitPrice = product.unitPrice;
        this.unitWeight = product.unitWeight;
        this.category = product.category;
        this.quantity = quantity;
    }


}
