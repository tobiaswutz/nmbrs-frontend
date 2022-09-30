import { Component, OnInit } from '@angular/core';
import { TransactionList } from '../../models/transaction-list';
import { TradelistoverviewService } from './tradelistoverview.service';

@Component({
  selector: 'app-tradelistoverview',
  templateUrl: './tradelistoverview.component.html',
  styleUrls: ['./tradelistoverview.component.css']
})
export class TradelistoverviewComponent implements OnInit {

  public transactionLists: TransactionList[] = [];

  constructor(
    private tradelistService: TradelistoverviewService
  ) { }

  public async ngOnInit() {
    await this.tradelistService.getTransactionLists();
    this.transactionLists = this.tradelistService.transactionLists;
  }

  public createTransactionList() {
    this.tradelistService.createTransactionList();
  }

}
