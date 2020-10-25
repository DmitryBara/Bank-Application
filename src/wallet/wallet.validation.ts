import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer/decorators'
import { IsNotEmpty, IsIn, MinLength, MaxLength, IsUUID, IsPositive } from 'class-validator'

export class CreateWalletDto {
    @IsIn(['BTC', 'ETH'], { message: 'Choose from availabale currency BTC or ETH'})
    @ApiProperty()
    readonly currency: string

    @MinLength(3, { message: 'Password is too short' })
    @MaxLength(20, { message: 'Password is too long' })
    @ApiProperty()
    readonly password: string
}

export class InfoWalletDto {
    @IsUUID('all')
    @ApiProperty()
    readonly id: string

    @IsNotEmpty()
    @ApiProperty()
    readonly password: string
}

export class RechargeWalletDto {
    @IsUUID('all')
    @ApiProperty()
    readonly id: string

    @IsNotEmpty()
    @ApiProperty()
    readonly password: string

    @Type(() => Number)
    @IsPositive()
    @ApiProperty()
    readonly addsum: number
}
