export class TransactionList {
    constructor(
        public id: number,
        public createdAt: string,
        public updatedAt: string,
        public userId: number,
        public name: string,
        public description?: string,
    ) { }
}