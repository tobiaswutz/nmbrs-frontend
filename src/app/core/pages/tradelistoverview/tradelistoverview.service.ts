import { Injectable } from '@angular/core';
import { TransactionList } from '../../models/transaction-list';
import { NotificationService } from '../../services/notification.service';
import { SidepanelService } from '../../services/sidepanel.service';
import { WebService } from '../../services/web.service';

@Injectable({
  providedIn: 'root'
})
export class TradelistoverviewService {

  public transactionLists: TransactionList[] = [];

  constructor(
    private webService: WebService,
    private note: NotificationService,
    private sidepanel: SidepanelService
  ) { }

  public async createTransactionList(): Promise<void> {
    this.sidepanel.openPanel('hallo ich bin ein panel');
  }

  
  public async getTransactionLists(): Promise<void> {
    const res: any = await this.webService.getAuthCall("transaction-list");
    if (res) {
      this.transactionLists = res;
    } else {
      this.note.error("Could not get transaction lists");
    }
  }
}
