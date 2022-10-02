import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Sidepanel } from '../components/sidepanel/sidepanel.component';
import { TransactionService } from '../pages/tradelist/transaction.service';
import { TradelistoverviewService } from '../pages/tradelistoverview/tradelistoverview.service';


export class SidePanelData {
  constructor(
    public sidepanel: Sidepanel,
    public data?: any
  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class SidepanelService {

  public newPanel = new Subject<SidePanelData>();

  constructor(
    private overviewService: TradelistoverviewService,
    private transactionService: TransactionService
  ) { }

  public openPanel(panel: SidePanelData) {
    this.newPanel.next(panel);
  }

  public submit(sidepanel: Sidepanel, formValue: any) {
    switch (sidepanel) {
      case 'tradelist':
        this.overviewService.addTransactionList(formValue);
        break;
      case 'trade':
        this.transactionService.addTransaction(formValue);
        break;
      case 'settings':
        console.log(formValue);
        break;
      default:
        console.log(formValue);
        break;
    }
  }
}
