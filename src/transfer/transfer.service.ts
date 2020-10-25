import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Wallet } from 'src/entity/wallet.entity'
import { getManager, Repository } from 'typeorm'
import { Transfer } from '../entity/transfer.entity'
import { TransferRO } from './transfer.interface'
import { MakeTransferDto } from './transfer.validation'
const fs = require('fs')

@Injectable()
export class TransferService {
    constructor(
        @InjectRepository(Wallet)
        private walletsRepository: Repository<Wallet>,
    ) {}

    private error = function(err: string) {
        return {transfer: null, addinfo: `Transaction was unsuccessful. ${err}`}
    }


    async make(makeTransferDto: MakeTransferDto): Promise<TransferRO> {
        const from = await this.walletsRepository.findOne({
            id: makeTransferDto.from,
            password: makeTransferDto.password,
        })
        const to = await this.walletsRepository.findOne(makeTransferDto.to)

        if (!from) {
            return this.error(`Not correct walletId or password`)
        } else if (!to) {
            return this.error(`You try to make transaction to wallet, which not exist`)
        }

        const ammount = makeTransferDto.ammount
        const result = this.transferProcess(from, to, ammount)
        return result
    }


    private transferProcess = async function(from: Wallet, to: Wallet, ammount: number): Promise<TransferRO> {
        const rawdata = fs.readFileSync('currency.config.json')
        const currencyConfig = JSON.parse(rawdata)
        const coefFrom = currencyConfig.course[from.currency]
        const coefTo = currencyConfig.course[to.currency]
        const comission = parseFloat((+ammount * +currencyConfig.comission).toFixed(8))
        const ammountFrom = +ammount + +comission
        const ammountTo = (from.currency == to.currency) ? ammount: ((+coefFrom / +coefTo) * +ammount)

        if (!coefTo || !coefFrom) {
            return this.error( `Impossible to make transfer from ${from.currency} to ${to.currency}`)
        } else if (ammountFrom > from.balance) {
            return this.error( `Not enouth funds for transfer. Your balance: ${from.balance} ${from.currency}` )
        }

        const newTransfer = new Transfer()
            newTransfer.fromWallet = from
            newTransfer.toWallet = to
            newTransfer.ammount = ammount
            newTransfer.comission = comission

        const result = await getManager().transaction( 'SERIALIZABLE',
            async (transactionalEntityManager) => {
                await transactionalEntityManager.update(Wallet, from.id, { balance: parseFloat((+from.balance - +ammountFrom).toFixed(8)) })
                await transactionalEntityManager.update(Wallet, to.id, { balance: parseFloat((+to.balance + +ammountTo).toFixed(8)) })
                await transactionalEntityManager.save<Transfer>(newTransfer)
                return 'success'
            },
        )

        if (result == 'success') {
            const transferClean = {
                id: newTransfer.id,
                fromWallet: from.id,
                toWallet: to.id,
                ammount,
                comission,
                operationTime: newTransfer.operationTime,
            }
            return {transfer: transferClean, addinfo: `Your transfer was successfull! You send ${ammount} ${from.currency} to wallet wich in ${to.currency} currency`}
        } else {
            return this.error( 'Transfer was unsuccessful. Transaction rollback.')
        }
    }
}
