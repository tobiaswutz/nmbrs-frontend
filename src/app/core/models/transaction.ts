export class Transaction {
    constructor(
        public id: number,
        public createdAt: string,
        public updatedAt: string,
        public userId: number,
        public inflowSymbol: string,
        public outflowSymbol: string,
        public inflowAmount: string,
        public outflowAmount: string,
        public inflowSymbolUsdPrice: string,
        public outflowSymbolUsdPrice: string,
        public transactionTime?: string,
        public feeSymbol?: string,
        public feeAmount?: number,
        public description?: string,
        public walletAddress?: string,
        public tradingPlatform?: string,
        public transactionId?: string,
        public transactionListId?: number
    ) { }
}