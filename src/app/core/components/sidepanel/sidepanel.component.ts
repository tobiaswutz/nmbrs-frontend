import { Component, OnInit } from '@angular/core';
import { SidepanelService } from '../../services/sidepanel.service';

@Component({
  selector: 'app-sidepanel',
  templateUrl: './sidepanel.component.html',
  styleUrls: ['./sidepanel.component.css']
})
export class SidepanelComponent implements OnInit {

  public visible = false;
  public sidePanelData: any;

  constructor(
    private sidePanelService: SidepanelService
  ) { }

  ngOnInit() {
    this.sidePanelService.newPanel.subscribe((panel: any) => {
      console.log(panel);
      this.visible = true;
    });
  }

  public abort() {
    this.visible = false;
    this.sidePanelData = null;
  }
}
