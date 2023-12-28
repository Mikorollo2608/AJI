import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, Check, OneToMany, JoinColumn} from "typeorm"
import {OrderItem} from "./OrderItem";
import {Status} from "./Status";
import {Category} from "./Category";

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number

    @OneToMany(() => OrderItem, (orderItems) => orderItems.order, { eager:true, cascade:true })
    orderItems: OrderItem[]

    @ManyToOne(() => Status, { eager:true })
    @JoinColumn({name:"status_id"})
    status: Status

    @Column({name: "date_of_approval", nullable: true, type: 'timestamptz' })
    dateOfApproval: Date

    @Column({nullable: false})
    username: string

    @Column({nullable: false})
    email: string

    @Column({nullable: false})
    phone: string

}
