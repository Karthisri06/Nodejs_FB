import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class BankDetails {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    bank_name: string

    @Column()
    branch: string

    @Column()
    ifsc_code: string
    

}