import { Component, OnInit } from '@angular/core';
import { TradelistoverviewService } from './tradelistoverview.service';

@Component({
  selector: 'app-tradelistoverview',
  templateUrl: './tradelistoverview.component.html',
  styleUrls: ['./tradelistoverview.component.css']
})
export class TradelistoverviewComponent implements OnInit {

  constructor(
    private tradelistService: TradelistoverviewService
  ) { }

  ngOnInit() {
    this.tradelistService.getTransactionLists();
  }

}
