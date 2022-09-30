import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidepanelService {

  public newPanel = new Subject<any>();

  constructor() { }
  
  public openPanel(panel: any) {
    this.newPanel.next(panel);
  }

}
