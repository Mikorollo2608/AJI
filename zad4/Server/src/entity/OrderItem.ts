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

    @ManyToOne(() => Order)
    @JoinColumn({name:"order_id"})
    order: Order

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

    @Column({type:"integer",nullable:false})
    quantity: number

    static create(product: Product, quantity: number): OrderItem {
        let ret = new OrderItem();
        ret.name = product.name;
        ret.description = product.description;
        ret.unitPrice = product.unitPrice;
        ret.unitWeight = product.unitWeight;
        ret.category = product.category;
        ret.quantity = quantity;
        return ret;
    }

}
