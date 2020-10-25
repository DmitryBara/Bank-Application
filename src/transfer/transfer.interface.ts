export interface TransferData {
    id: string
    fromWallet: string
    toWallet: string
    ammount: number
    comission: number
    operationTime: Date
}

export interface TransferRO {
    transfer: TransferData
    addinfo: string
}
