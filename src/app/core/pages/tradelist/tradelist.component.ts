import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TradelistoverviewService } from '../tradelistoverview/tradelistoverview.service';
import { TransactionService } from './transaction.service';

@Component({
  selector: 'app-tradelist',
  templateUrl: './tradelist.component.html',
  styleUrls: ['./tradelist.component.css']
})
export class TradelistComponent implements OnInit {

  public transactionListiId: number | undefined;

  constructor(
    private transactionService: TransactionService,
    private transactionListService: TradelistoverviewService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.transactionListiId = this.activatedRoute.snapshot.params['id'];
    console.log(this.transactionListiId);
    
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
