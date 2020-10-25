import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TransferService } from './transfer.service'
import { TransferController } from './transfer.controller'
import { Transfer } from '../entity/transfer.entity'
import { WalletModule } from 'src/wallet/wallet.module'
import { Wallet } from 'src/entity/wallet.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Transfer, Wallet]), WalletModule],
    providers: [TransferService],
    controllers: [TransferController],
})
export class TransferModule {}
