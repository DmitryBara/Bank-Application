import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Wallet } from './entity/wallet.entity'
import { WalletModule } from './wallet/wallet.module'
import { Transfer } from './entity/transfer.entity'
import { TransferModule } from './transfer/transfer.module'

require('dotenv').config({path:'.env'})


@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: 5432,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            entities: [Wallet, Transfer],
            synchronize: true,
            migrations: ['dist/migrations/*{.ts,.js}'],
            migrationsTableName: 'migrations_typeorm',
            migrationsRun: true,
        }),
        WalletModule,
        TransferModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
