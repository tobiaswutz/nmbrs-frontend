import { Component, OnDestroy, OnInit,  } from '@angular/core';
import { takeWhile } from 'rxjs';
import { TransactionList } from '../../models/transaction-list';
import { SidePanelData, SidepanelService } from '../../services/sidepanel.service';
import { CollectionService } from './collection.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit, OnDestroy {

  public transactionLists: TransactionList[] = [];
  private alive: boolean = true;

  constructor(
    private tradelistService: CollectionService,
    private sidepanel: SidepanelService,
  ) { }

  public async ngOnInit() {
    this.tradelistService.transactionLists.pipe(takeWhile(() => this.alive)).subscribe((lists: TransactionList[]) => { this.transactionLists = lists; });
    await this.tradelistService.getTransactionLists();
  }

  public ngOnDestroy() {
    this.alive = false;
  }

  public createTransactionList() {
    this.sidepanel.openPanel(new SidePanelData('tradelist'));
  }

}
