import { Injectable } from '@angular/core';
import { WebService } from '../../services/web.service';

@Injectable({
  providedIn: 'root'
})
export class TradelistoverviewService {

  constructor(
    private webService: WebService,
  ) { }
  
  public async getTransactionLists(): Promise<void> {
    const res: any = await this.webService.getCall("transaction-list");
    console.log(res);
    
  }

}
