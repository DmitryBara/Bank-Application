import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer/decorators'
import { IsNotEmpty, IsUUID, IsPositive } from 'class-validator'

export class MakeTransferDto {
    @IsUUID('all')
    @ApiProperty()
    readonly from: string

    @IsNotEmpty()
    @ApiProperty()
    readonly password: string

    @IsUUID('all')
    @ApiProperty()
    readonly to: string

    @Type(() => Number)
    @IsPositive()
    @ApiProperty()
    readonly ammount: number
}
