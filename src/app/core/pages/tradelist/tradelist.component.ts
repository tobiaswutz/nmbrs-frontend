import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from '../../models/transaction';
import { SidePanelData, SidepanelService } from '../../services/sidepanel.service';
import { TradelistoverviewService } from '../tradelistoverview/tradelistoverview.service';
import { TransactionService } from './transaction.service';

@Component({
  selector: 'app-tradelist',
  templateUrl: './tradelist.component.html',
  styleUrls: ['./tradelist.component.css']
})
export class TradelistComponent implements OnInit, OnDestroy {

  public transactionListiId: number | undefined;

  public transactions: Transaction[] = [];

  constructor(
    private transactionService: TransactionService,
    private transactionListService: TradelistoverviewService,
    private activatedRoute: ActivatedRoute,
    private sidepanel: SidepanelService,
  ) { }

  public async ngOnInit() {
    this.transactionListiId = this.activatedRoute.snapshot.params['id'];
    this.transactionService.openTransactionListId = this.transactionListiId;
    await this.getTransactions();

  }

  public ngOnDestroy() {
    this.transactionService.openTransactionListId = null;
  }


  public addTransactions(): void {
    this.sidepanel.openPanel(new SidePanelData('trade'));
  }

  public async getTransactions() {
    const result = await this.transactionService.getTransactionsByListId();
    if (result) { this.transactions = result; }
  }

  public deleteTradeList() {
    if (!this.transactionListiId || this.transactionListiId === 0) { return; }
    if (confirm("Are you sure you want to delete this trade list?")) {
      // delete all transactions in this list TODO

      //delete the list
      this.transactionListService.deleteTransactionList(this.transactionListiId);
    }
  }
}
