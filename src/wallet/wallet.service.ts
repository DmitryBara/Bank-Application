import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Wallet } from '../entity/wallet.entity'
import { WalletRO } from './wallet.interface'
import { CreateWalletDto, InfoWalletDto, RechargeWalletDto } from './wallet.validation'

@Injectable()
export class WalletService {
    constructor(
        @InjectRepository(Wallet)
        private walletsRepository: Repository<Wallet>,
    ) {}

    async create(createWalletDto: CreateWalletDto): Promise<WalletRO> {
        const newWallet = new Wallet()
        newWallet.password = createWalletDto.password
        newWallet.currency = createWalletDto.currency
        newWallet.balance = 0
        const wallet = await this.walletsRepository.save(newWallet)
        return {
            wallet: wallet,
            addinfo: 'Wallet has been created successfully',
        }
    }

    async recharge(rechargeWalletDto: RechargeWalletDto): Promise<WalletRO> {
        const id = rechargeWalletDto.id
        const password = rechargeWalletDto.password
        const addsum = rechargeWalletDto.addsum

        const loadedWallet = await this.walletsRepository.findOne({ where: { id, password } })

        if (!loadedWallet) {
            return { wallet: null, addinfo: 'Not correct walletId or password' }
        }

        const updated = Object.assign(loadedWallet, {
            balance: parseFloat((+loadedWallet.balance + +addsum).toFixed(8)),
        })
        const result = await this.walletsRepository.save(updated)

        return { wallet: result, addinfo: `Your wallet has been sucesfully recharge on ${addsum} ${updated.currency}` }
    }

    async info(infoWalletDto: InfoWalletDto): Promise<WalletRO> {
        const id = infoWalletDto.id
        const password = infoWalletDto.password
        const loadedWallet = await this.walletsRepository.findOne({ where: { id, password } })

        if (!loadedWallet) {
            return { wallet: null, addinfo: 'Not correct walletId or password' }
        } else {
            return { wallet: loadedWallet, addinfo: `Information about your wallet` }
        }
    }
}
