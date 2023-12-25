import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, Check, OneToMany} from "typeorm"
import {OrderItem} from "./OrderItem";
import {OrderState} from "./OrderState";

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number

    @OneToMany(() => OrderItem, (orderItems) => orderItems.orderId)
    orderItems: OrderItem[]

    @ManyToOne(()=>Order)
    orderState: OrderState

    @Column({name:"date_of_approval", nullable:true})
    dateOfApproval: string

    @Column({nullable:false})
    username: string

    @Column({nullable:false})
    email: string

    @Column({nullable:false})
    phone: string

}
