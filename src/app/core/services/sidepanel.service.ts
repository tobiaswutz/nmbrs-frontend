import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Method, Sidepanel } from '../components/sidepanel/sidepanel.component';
import { TransactionService } from '../pages/transaction-list/transaction.service';
import { CollectionService } from '../pages/collections/collection.service';

export class SidePanelData {
  constructor(
    public sidepanel: Sidepanel,
    public method: Method,
    public data?: any
  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class SidepanelService {

  public newPanel = new Subject<SidePanelData>();

  constructor(
    private collectionService: CollectionService,
    private transactionService: TransactionService
  ) { }

  public openPanel(panel: SidePanelData) {
    this.newPanel.next(panel);
  }

  public submitCollection(formValue: any, method: Method, id?: number) {
    
  }

  public submit(sidepanel: Sidepanel, formValue: any, method: Method) {
    switch (sidepanel) {
      case 'COLLECTION':
        this.collectionService.addCollection(formValue);
        break;
      case 'TRANSACTION':
        this.transactionService.addTransaction(formValue);
        break;
    }
  }
}
