import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TransactionList } from '../../models/transaction-list';
import { NotificationService } from '../../services/notification.service';
import { WebService } from '../../services/web.service';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  public transactionLists: Subject<TransactionList[]> = new Subject<TransactionList[]>();

  constructor(
    private webService: WebService,
    private note: NotificationService,
    private router: Router
  ) { }


  public async addTransactionList(formValue: any): Promise<void> {
    try {
      const result = await this.webService.postAuthCall('transaction-list', formValue);
      if (result) {
        this.note.success("Transaction list created");
        this.getTransactionLists();
      }
    } catch (error: any) {
      console.error(error);
    }
  }

  public async deleteTransactionList(id: number): Promise<void> {
    try {
      await this.webService.deleteAuthCall('transaction-list/' + id);
      this.note.success("Transaction list deleted");
      this.getTransactionLists();
      this.router.navigate(['/tradelist']);
    } catch (error: any) {
      console.error(error);
    }
  }
  
  public async getTransactionLists(): Promise<void> {
    const res: any = await this.webService.getAuthCall("transaction-list");
    if (res) {
      this.transactionLists.next(res);
    } else {
      this.note.error("Could not get transaction lists");
    }
  }
}
