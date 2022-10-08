import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { SidePanelData, SidepanelService } from '../../services/sidepanel.service';

export type Sidepanel = 'EMPTY' | 'COLLECTION' | 'TRANSACTION' | 'SETTINGS';
export type Method = 'CREATE' | 'EDIT' | 'DELETE';

@Component({
  selector: 'app-sidepanel',
  templateUrl: './sidepanel.component.html',
  styleUrls: ['./sidepanel.component.css']
})
export class SidepanelComponent implements OnInit {

  public visible = false;
  public sidePanelData: SidePanelData = new SidePanelData('EMPTY', 'CREATE');
  public form: FormGroup | undefined;

  constructor(
    private sidePanelService: SidepanelService,
    private notificationService: NotificationService,
  ) { }

  public ngOnInit() {
    this.sidePanelService.newPanel.subscribe((panel: SidePanelData) => {
      this.sidePanelData.sidepanel = panel.sidepanel;
      this.sidePanelData.method = panel.method;
      this.sidePanelData.data = panel.data;


      this.buildForm();
      if (panel.method == 'EDIT') {
        if (panel.data) {
          this.fillTransactionForm(panel.data);
        } else {
          this.notificationService.error("Daten konnten nicht geladen werden");
        }
      }
      this.visible = true;
    });
  }

  public abort() {
    this.visible = false;
    this.sidePanelData = new SidePanelData('EMPTY', 'CREATE');
    this.form = undefined;
  }

  public setSide(side: string) {
    this.form?.get('side')?.setValue(side);
  }

  public onSubmit(): void {
    if (!this.form?.valid) { this.notificationService.error("Überprüfe deine Eingaben"); return; }


    this.sidePanelService.submit(this.sidePanelData.sidepanel, this.form.value, this.sidePanelData.method);
    this.abort();
  }


  private fillTransactionForm(data: any): void {
    if(!this.form) { this.notificationService.error("Formular konnte nicht erstellt werden"); return; }

    if (this.sidePanelData.sidepanel == 'TRANSACTION') {
      this.form.get('baseSymbol')?.setValue(data.baseSymbol);
      this.form.get('quoteSymbol')?.setValue(data.quoteSymbol);
      this.form.get('baseAmount')?.setValue(data.baseAmount);
      this.form.get('quoteAmount')?.setValue(data.quoteAmount);
      this.form.get('side')?.setValue(data.side);
      this.form.get('price')?.setValue(data.price);
      this.form.get('filledTime')?.setValue(data.filledTime);
      this.form.get('feeSymbol')?.setValue(data.feeSymbol);
      this.form.get('feeAmount')?.setValue(data.feeAmount);
      this.form.get('exchange')?.setValue(data.exchange);
      this.form.get('externalId')?.setValue(data.externalId);
    }
  }


  private buildForm(): void {
    if (this.sidePanelData.sidepanel == 'COLLECTION') {
      this.form = new FormGroup({
        name: new FormControl(null, [Validators.required]),
        description: new FormControl(null),
      });
    }
    if (this.sidePanelData.sidepanel == 'TRANSACTION') {
      this.form = new FormGroup({
        baseSymbol: new FormControl(null, [Validators.required]),
        quoteSymbol: new FormControl(null, [Validators.required]),
        baseAmount: new FormControl(null, [Validators.required]),
        quoteAmount: new FormControl(null, [Validators.required]),
        side: new FormControl('buy', [Validators.required]),
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
