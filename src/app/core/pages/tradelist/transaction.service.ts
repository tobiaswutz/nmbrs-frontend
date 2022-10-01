import { Injectable } from '@angular/core';
import { Transaction } from '../../models/transaction';
import { NotificationService } from '../../services/notification.service';
import { WebService } from '../../services/web.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private webService: WebService,
    private note: NotificationService,
  ) { }

  public async getTransactionsByListId(id: number): Promise<any> {
    try {
      return await this.webService.getAuthCall('transactions/' + id);
    } catch (error: any) {
      this.note.error(error);
      console.error(error);
    }
  }

}
