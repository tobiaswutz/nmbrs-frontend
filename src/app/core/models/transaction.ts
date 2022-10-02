export class Transaction {
    constructor(
        public id: number,
        public createdAt: string,
        public updatedAt: string,
        public userId: number,
        public baseSymbol: string,
        public quoteSymbol: string,
        public baseAmount: number,
        public quoteAmount: number,
        public side: string,
        public price: number,
        public filledTime?: Date,
        public feeSymbol?: string,
        public feeAmount?: number,
        public exchange?: string,
        public externalId?: string
    ) { }
}
