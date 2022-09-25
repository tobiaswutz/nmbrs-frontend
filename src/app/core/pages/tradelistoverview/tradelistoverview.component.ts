import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tradelistoverview',
  templateUrl: './tradelistoverview.component.html',
  styleUrls: ['./tradelistoverview.component.css']
})
export class TradelistoverviewComponent implements OnInit {

  public trackingLists: any = [
    {
      name: 'Binance Futures',
      description: 'This is a list',
      id: 1
    },
    {
      name: 'Binane Normal',
      description: 'This is a list',
      id: 2
    },
    {
      name: 'Kucoin Futures',
      description: 'This is a list',
      id: 3
    },
    {
      name: 'Kucoin Normal',
      description: 'This is a list',
      id: 4
    },
    {
      name: 'Bitmex',
      description: 'This is a list',
      id: 5
    },
    {
      name: 'Bitfinex',
      description: 'This is a list',
      id: 6
    },
    {
      name: 'Bitstamp',
      description: 'This is a list',
      id: 7
    },
    {
      name: 'Bittrex',
      description: 'This is a list',
      id: 8
    },
    {
      name: 'Coinbase',
      description: 'This is a list',
      id: 9
    },
    {
      name: 'Kraken',
      description: 'This is a list',
      id: 10
    },
    {
      name: 'Poloniex',
      description: 'This is a list',
      id: 11
    },
    {
      name: 'Huobi',
      description: 'This is a list',
      id: 12
    },
    {
      name: 'OKEX',
      description: 'This is a list',
      id: 13
    },
    {
      name: 'Binance Futures',
      description: 'This is a list',
      id: 14
    },
    {
      name: 'Binane Normal',
      description: 'This is a list',
      id: 15
    },
    {
      name: 'Kucoin Futures',
      description: 'This is a list',
      id: 16
    },
    {
      name: 'Kucoin Normal',
      description: 'This is a list',
      id: 17
    },

  ];

  constructor() { }

  ngOnInit() {
  }

}
