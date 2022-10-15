import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Transaction } from '../../models/transaction';
import { NotificationService } from '../../services/notification.service';
import { WebService } from '../../services/web.service';
import { PaginatedTransactions } from './transactions';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  public openCollectionId: number | undefined | null;
  public page: number = 1;
  public numberOfTransactions: number = 0;
  public pageSize: number = 50;
  
  
  public paginatedTransactions: Subject<PaginatedTransactions> = new Subject<PaginatedTransactions>();


  constructor(
    private webService: WebService,
    private note: NotificationService,
  ) { }


  public async getTransactionsPaginated(page: number, pageSize: number): Promise<any> {
    try {
      const res: any = await this.webService.getAuthCall(`transactions/${this.openCollectionId}/${page}/${pageSize}`);
      this.paginatedTransactions.next(new PaginatedTransactions(page, res.numberOfTransactions, res.transactions));
      this.page = page;
      this.numberOfTransactions = res.numberOfTransactions;
      return res;
    } catch (error: any) {
      this.note.error(error);
      console.error(error);
    }
  }


  // public async addTransaction(transaction: Transaction): Promise<any> {
  //   if (!this.openCollectionId || this.openCollectionId === 0) { return; }
  //   if (transaction.filledTime) { transaction.filledTime = new Date(transaction.filledTime); }
  //   try {
  //     await this.webService.postAuthCall('transactions/' + this.openCollectionId, transaction);
  //     this.note.success('Transaction added');
  //     this.getTransactionsPaginated(this.page, this.pageSize);
  //   } catch (error: any) {
  //     this.note.error(error);
  //     console.error(error);
  //   }
  // }




  private getRandomCryptoSymbol(): string {
    const cryptoSymbols: string[] = ['BTC', 'ETH', 'XRP', 'BCH', 'LTC', 'EOS', 'BSV', 'XLM', 'ADA', 'TRX', 'XMR', 'DASH', 'NEO', 'ETC', 'MIOTA', 'XTZ', 'BNB', 'USDT', 'VET', 'DOGE', 'XEM', 'ZEC', 'ONT', 'DCR', 'QTUM', 'LSK', 'ZIL', 'BTG', 'OMG', 'ICX', 'SC', 'ZRX', 'DGB', 'STEEM', 'WAVES', 'NANO', 'KMD', 'REP', 'XVG', 'BCN', 'BTM', 'XZC', 'ARK', 'AE', 'PPT', 'KCS', 'WTC', 'DGD', 'STRAT', 'BAT', 'GNT', 'ETN', 'RVN', 'KNC', 'ARDR', 'DCN', 'BTS', 'SNT', 'GXS', 'SYS', 'PIVX', 'WAX', 'MONA', 'GAS', 'NXT', 'BNT', 'BCD', 'FUN', 'LRC', 'QASH', 'MCO', 'POWR', 'ICN', 'MITH', 'ENJ', 'ELF', 'QSP', 'SALT', 'BQX', 'STORJ', 'WAN', 'RHOC', 'KIN', 'MANA', 'CVC', 'GNO', 'DENT', 'NAS', 'POLY', 'VERI', 'POE', 'MTH', 'SNGLS', 'DRGN', 'RDN', 'REQ', 'SUB', 'ENG', 'CND', 'DNT', 'LUN', 'AMB', 'APPC', 'KIN', 'LINK', 'WINGS', 'RLC', 'POA', 'BLZ', 'GVT', 'AION', 'CMT', 'BIX', 'BCHABC', 'BCHSV', 'BTT', 'COTI', 'DREP', 'HOT', 'IOST', 'KEY', 'MATIC', 'MFT', 'NPXS', 'OCEAN', 'OGN', 'PAX'];
    return cryptoSymbols[Math.floor(Math.random() * cryptoSymbols.length)];
  }

  private getRandomCryptoExchange(): string {
    const cryptoExchanges: string[] = ['Binance', 'Bitfinex', 'Bitstamp', 'Bittrex', 'Coinbase', 'Coinbase Pro', 'Gemini', 'Kraken', 'Poloniex', 'Huobi', 'OKEx', 'BitMEX', 'Bitflyer', 'Bithumb', 'Bitso', 'BitTrex', 'Bleutrade', 'Braziliex', 'BtcBox', 'BtcTrade', 'Cex.io', 'Changelly', 'Coincheck', 'Coinfloor', 'Coinone', 'Cryptopia', 'Exmo', 'Gate.io', 'HitBTC', 'Huobi', 'KuCoin', 'Liqui', 'Livecoin', 'Mercado Bitcoin', 'OKCoin', 'OKEx', 'Paymium', 'QuadrigaCX', 'Quoine', 'SouthXchange', 'Tidex', 'Upbit', 'Yobit', 'Zaif', 'ZB.com', 'BitBay', 'BitMEX', 'Bitstamp', 'Bittrex', 'Bitfinex', 'Binance', 'BitFlyer', 'BitMEX', 'Bitstamp', 'Bittrex', 'Bleutrade', 'Braziliex', 'BtcBox', 'BtcTrade', 'Cex.io', 'Changelly', 'Coincheck', 'Coinfloor', 'Coinone', 'Cryptopia', 'Exmo', 'Gate.io', 'HitBTC', 'Huobi', 'KuCoin', 'Liqui', 'Livecoin', 'Mercado Bitcoin', 'OKCoin', 'OKEx', 'Paymium', 'QuadrigaCX', 'Quoine', 'SouthXchange', 'Tidex', 'Upbit', 'Yobit', 'Zaif', 'ZB.com', 'BitBay', 'BitMEX', 'Bitstamp', 'Bittrex', 'Bitfinex', 'Binance', 'BitFlyer', 'BitMEX', 'Bitstamp', 'Bittrex', 'Bleutrade', 'Braziliex', 'BtcBox', 'BtcTrade', 'Cex.io', 'Changelly', 'Coincheck', 'Coinfloor', 'Coinone', 'Cryptopia', 'Exmo', 'Gate.io', 'Hit'];
    return cryptoExchanges[Math.floor(Math.random() * cryptoExchanges.length)];
  }

  private getRandomUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }



  public async addTransaction(transaction: Transaction): Promise<any> {
    setInterval(() => {
      transaction.baseSymbol = this.getRandomCryptoSymbol();
      transaction.quoteSymbol = this.getRandomCryptoSymbol();
      transaction.baseAmount = Math.floor(Math.random() * 1000000) / 100;
      transaction.quoteAmount = Math.floor(Math.random() * 1000000) / 100;
      transaction.price = transaction.quoteAmount / transaction.baseAmount;
      transaction.feeAmount = Math.floor(Math.random() * 1000000) / 100;
      transaction.feeSymbol = this.getRandomCryptoSymbol();
      transaction.exchange = this.getRandomCryptoExchange();
      transaction.externalId = this.getRandomUUID();
      transaction.side = Math.random() < 0.5 ? 'buy' : 'sell';
      transaction.filledTime = new Date(+(new Date()) - Math.floor(Math.random() * 10000000000));

      if (!this.openCollectionId || this.openCollectionId === 0) { return; }
      if (transaction.filledTime) { transaction.filledTime = new Date(transaction.filledTime); }
      try {
        this.webService.postAuthCall('transactions/' + this.openCollectionId, transaction);
        this.note.success('Transaction added');
        this.getTransactionsPaginated(this.page, this.pageSize);
      } catch (error: any) {
        this.note.error(error);
        console.error(error);
      }
    }, 2000);
  }


  public async deleteTransaction(id: number): Promise<void> {
    try {
      await this.webService.deleteAuthCall('transactions/' + id);
      this.getTransactionsPaginated(this.page, this.pageSize);
    } catch (error: any) {
      this.note.error(error);
      console.error(error);
    }
  }



  public async exportTransactions(): Promise<void> {
      // const transactions = await this.getTransactionsByListId();
      // const csv = 'filledTime,baseSymbol,quoteSymbol,baseAmount,quoteAmount,side,price,fees,exchange,externalId\n' + transactions.map((transaction: Transaction) => {
      //   return `${transaction.filledTime},${transaction.baseSymbol},${transaction.quoteSymbol},${transaction.baseAmount},${transaction.quoteAmount},${transaction.side},${transaction.price},${transaction.feeAmount}${transaction.feeSymbol},${transaction.exchange},${transaction.externalId}`;
      // }).join('\n');

      // const blob = new Blob([csv], { type: 'text/csv' });
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.setAttribute('hidden', '');
      // a.setAttribute('href', url);
      // a.setAttribute('download', 'transactions.csv');
      // document.body.appendChild(a);
      // a.click();
      // document.body.removeChild(a);
  }
}
