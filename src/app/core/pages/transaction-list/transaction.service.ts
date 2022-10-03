import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Transaction } from '../../models/transaction';
import { NotificationService } from '../../services/notification.service';
import { WebService } from '../../services/web.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  public openCollectionId: number | undefined | null;

  public transactionsSubject: Subject<Transaction[]> = new Subject<Transaction[]>();


  constructor(
    private webService: WebService,
    private note: NotificationService,
  ) { }

  public async getTransactionsByListId(): Promise<any> {    
    try {
      const res: any = await this.webService.getAuthCall('transactions/' + this.openCollectionId);
      this.transactionsSubject.next(res);
      return res;
    } catch (error: any) {
      this.note.error(error);
      console.error(error);
    }
  }

  public async addTransaction(transaction: Transaction): Promise<any> {
    if (!this.openCollectionId || this.openCollectionId === 0) { return; }
    if (transaction.filledTime) { transaction.filledTime = new Date(transaction.filledTime); }
    try {
      await this.webService.postAuthCall('transactions/' + this.openCollectionId, transaction);
      this.note.success('Transaction added');
      this.getTransactionsByListId();
    } catch (error: any) {
      this.note.error(error);
      console.error(error);
    }
  }

  public async deleteTransaction(id: number): Promise<void> {
    try {
      await this.webService.deleteAuthCall('transactions/' + id);
      this.getTransactionsByListId();
    } catch (error: any) {
      this.note.error(error);
      console.error(error);
    }
  }

}
