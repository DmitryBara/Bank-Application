import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm'
import { Transfer } from './transfer.entity'

@Entity()
export class Wallet {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar', length: 25 })
    password: string

    @Column({ type: 'varchar', length: 3 })
    currency: string

    @Column({ type: 'decimal', default: 0, precision: 16, scale: 8 })
    balance: number

    @OneToMany( type => Transfer, transfers => transfers.fromWallet )
    outputTransfers: Transfer[]

    @OneToMany( type => Transfer, transfers => transfers.toWallet )
    inputTransfers: Transfer[]
}
