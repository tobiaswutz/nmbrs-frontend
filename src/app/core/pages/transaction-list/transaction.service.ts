import { Injectable } from '@angular/core';
import { Transaction } from '../../models/transaction';
import { NotificationService } from '../../services/notification.service';
import { WebService } from '../../services/web.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  public openTransactionListId: number | undefined | null;

  constructor(
    private webService: WebService,
    private note: NotificationService,
  ) { }

  public async getTransactionsByListId(): Promise<any> {    
    try {
      return await this.webService.getAuthCall('transactions/' + this.openTransactionListId);
    } catch (error: any) {
      this.note.error(error);
      console.error(error);
    }
  }

  public async addTransaction(transaction: Transaction): Promise<any> {
    if (!this.openTransactionListId || this.openTransactionListId === 0) { return; }
    if (transaction.filledTime) { transaction.filledTime = new Date(transaction.filledTime); }
    try {
      await this.webService.postAuthCall('transactions/' + this.openTransactionListId, transaction);
      this.note.success('Transaction added');
      setTimeout(() => {
        this.getTransactionsByListId();
      }, 3000);
    } catch (error: any) {
      this.note.error(error);
      console.error(error);
    }
  }

}
