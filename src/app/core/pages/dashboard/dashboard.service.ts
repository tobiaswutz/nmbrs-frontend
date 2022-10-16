import { Injectable } from '@angular/core';
import { TransactionService } from '../transaction-list/transaction.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public collection: number = 30;

  constructor(
    private transactionService: TransactionService,
  ) { }

  public async getChartOptions(): Promise<void> {
    const data = await this.transactionService.getAllTransactions(this.collection);
    console.log(data);

    //group by coin
    // find all transactions from the coin ADA
    // sum all transactions from the coin ADA

    const adaTransactions = data.filter((transaction: any) => transaction.baseSymbol === 'ADA' || transaction.quoteSymbol === 'ADA');

    console.table(adaTransactions);

    // get the sum of currnt owned ADA

    let ownedAda: number = 0;


    adaTransactions.forEach((transaction: any) => {      
      if (transaction.baseSymbol === 'ADA' && transaction.side === 'buy') { ownedAda = ownedAda + parseInt(transaction.baseAmount); }
      if (transaction.baseSymbol === 'ADA' && transaction.side === 'sell') { ownedAda = ownedAda - parseInt(transaction.baseAmount); }
      if (transaction.quoteSymbol === 'ADA' && transaction.side === 'buy') { ownedAda = ownedAda + parseInt(transaction.quoteAmount); }
      if (transaction.quoteSymbol === 'ADA' && transaction.side === 'sell') { ownedAda = ownedAda - parseInt(transaction.quoteAmount); }
      console.log(ownedAda);
    });


  }

}
