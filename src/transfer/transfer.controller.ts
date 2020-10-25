import { Controller, Get, ValidationPipe, UsePipes, Post, Body } from '@nestjs/common'
import { TransferService } from './transfer.service'
import { TransferRO } from './transfer.interface'
import { MakeTransferDto } from './transfer.validation'
import { ApiBody } from '@nestjs/swagger'

@Controller('transfer')
export class TransferController {
    constructor(private readonly transferService: TransferService) {}

    @ApiBody({type: MakeTransferDto})
    @UsePipes(new ValidationPipe())
    @Post('make')
    create(@Body() makeTransferDto: MakeTransferDto): Promise<TransferRO> {
        return this.transferService.make(makeTransferDto)
    }
}
