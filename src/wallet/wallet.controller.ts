import { Controller, Get, Post, Query, ValidationPipe, UsePipes, Body} from '@nestjs/common'
import { WalletService } from './wallet.service'
import { WalletRO } from './wallet.interface'
import { CreateWalletDto, InfoWalletDto, RechargeWalletDto } from './wallet.validation'
import { ApiBody, ApiQuery } from '@nestjs/swagger'

@Controller('wallet')
export class WalletController {
    constructor(private readonly walletService: WalletService) {}

    @ApiBody({type: CreateWalletDto})
    @UsePipes(new ValidationPipe())
    @Post('create')
    create(@Body() createWalletDto: CreateWalletDto): Promise<WalletRO> {
        return this.walletService.create(createWalletDto)
    }

    @ApiQuery({name: 'id', type: 'string',required: true})
    @ApiQuery({name: 'password', type: 'string',required: true})
    @UsePipes(new ValidationPipe())
    @Get('info')
    info(@Query() infoWalletDto: InfoWalletDto): Promise<WalletRO> {
        return this.walletService.info(infoWalletDto)
    }

    @ApiBody({type: RechargeWalletDto})
    @UsePipes(new ValidationPipe())
    @Post('recharge')
    recharge(@Body() rechargeWalletDto: RechargeWalletDto): Promise<WalletRO> {
        return this.walletService.recharge(rechargeWalletDto)
    }
}
