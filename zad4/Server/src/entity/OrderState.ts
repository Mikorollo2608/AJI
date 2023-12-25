import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity("order_state")
export class OrderState {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable:false})
    state: string

}
