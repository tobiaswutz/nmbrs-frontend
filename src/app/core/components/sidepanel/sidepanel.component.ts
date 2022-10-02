import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { SidePanelData, SidepanelService } from '../../services/sidepanel.service';

export type Sidepanel = 'empty' | 'tradelist' | 'trade' | 'settings';

@Component({
  selector: 'app-sidepanel',
  templateUrl: './sidepanel.component.html',
  styleUrls: ['./sidepanel.component.css']
})
export class SidepanelComponent implements OnInit {

  public visible = false;
  public sidePanelData: any;

  public sidePanelType: Sidepanel = 'empty';
  public form: FormGroup | undefined;

  constructor(
    private sidePanelService: SidepanelService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.sidePanelService.newPanel.subscribe((panel: SidePanelData) => {
      this.sidePanelType = panel.sidepanel;
      this.buildForm();
      this.visible = true;
    });
  }

  public abort() {
    this.visible = false;
    this.sidePanelData = null;
  }

  public onSubmit(): void {    
    if (!this.form?.valid) {
      this.notificationService.error("Überprüfe deine Eingaben");
      return;
    }
    this.sidePanelService.submit(this.sidePanelType, this.form.value);
    // this.visible = false;
    // this.sidePanelData = null;
  }

  private buildForm(): void {
    if (this.sidePanelType == 'tradelist') {
      this.form = new FormGroup({
        name: new FormControl(null, [Validators.required]),
        description: new FormControl(null),
      });
    }
    if (this.sidePanelType == 'trade') {
      this.form = new FormGroup({
        baseSymbol: new FormControl(null, [Validators.required]),
        quoteSymbol: new FormControl(null, [Validators.required]),
        baseAmount: new FormControl(null, [Validators.required]),
        quoteAmount: new FormControl(null, [Validators.required]),
        side: new FormControl(null, [Validators.required]),
        price: new FormControl(null, [Validators.required]),
        filledTime: new FormControl(null),
        feeSymbol: new FormControl(null),
        feeAmount: new FormControl(null),
        exchange: new FormControl(null),
        externalId: new FormControl(null),
      });
    }
  }
}
