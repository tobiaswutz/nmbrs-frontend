import { Transaction } from "../../models/transaction";

export class PaginatedTransactions {
    constructor(
        public page: number,
        public numberOfTransactions: number,
        public transactions: Transaction[]
    ) { }
}