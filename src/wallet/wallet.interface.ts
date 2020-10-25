export interface WalletData {
    id: string
    password: string
    currency: string
    balance: number
}

export interface WalletRO {
    wallet: WalletData
    addinfo: string
}
