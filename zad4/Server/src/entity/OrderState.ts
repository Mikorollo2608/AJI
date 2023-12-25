import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity("order_state")
export class OrderState {

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique:true, nullable:false})
    state: string

}
