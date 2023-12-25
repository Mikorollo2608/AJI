import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, Check, OneToMany, JoinColumn} from "typeorm"
import {OrderItem} from "./OrderItem";
import {OrderState} from "./OrderState";
import {Category} from "./Category";

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number

    @OneToMany(() => OrderItem, (orderItems) => orderItems.order)
    orderItems: OrderItem[]

    @ManyToOne(() => OrderState)
    @JoinColumn({name:"order_state"})
    orderState: OrderState

    @Column({name: "date_of_approval", nullable: true})
    dateOfApproval: string

    @Column({nullable: false})
    username: string

    @Column({nullable: false})
    email: string

    @Column({nullable: false})
    phone: string

}
