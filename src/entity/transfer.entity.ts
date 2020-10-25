import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, CreateDateColumn } from 'typeorm'
import { Wallet } from './wallet.entity'

@Entity()
export class Transfer {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne( type => Wallet, fromWallet => fromWallet.outputTransfers, { nullable: false } )
    fromWallet: Wallet

    @ManyToOne( type => Wallet, toWallet => toWallet.inputTransfers, { nullable: false } )
    toWallet: Wallet

    @Column({ type: 'decimal', default: 0 })
    ammount: number

    @Column({ type: 'decimal' })
    comission: number

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    operationTime: Date
}
