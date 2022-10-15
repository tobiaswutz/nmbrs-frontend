import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CollectionService } from '../../pages/collections/collection.service';
import { DynamicModalData, ModalData, ModalService } from '../../services/modal.service';
import { NotificationService } from '../../services/notification.service';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  public visible = false;
  public dynamicVisible = false;

  public modalData: ModalData | undefined;

  public dynamicModalData: DynamicModalData | undefined;

  public form: FormGroup | undefined;
  public loading: boolean = false;

  constructor(
    private modalService: ModalService,
    private collectionService: CollectionService,
    private notificationService: NotificationService,
  ) { }

  public abort() {
    this.visible = false;
    this.dynamicVisible = false;
    this.loading = false;
    this.modalData = undefined
    this.dynamicModalData = undefined;
  }

  public async onSubmit(): Promise<void> {
    if (this.form?.invalid) { this.notificationService.error("Überprüfe deine Eingaben"); return; }
    this.loading = true;
    await this.collectionService.addCollection(this.form?.value) ? this.abort() : this.notificationService.error("Fehler beim Erstellen der Collection");
    this.loading = false;
  }

  public ngOnInit() {
    this.modalService.newModal.subscribe((data: ModalData) => {
      console.log(data);
      this.buildForm();
      this.modalData = data;
      this.visible = true;
    });

    this.modalService.newDynamicDataModal.subscribe((data: DynamicModalData) => {
      this.dynamicModalData = data;
      this.dynamicVisible = true;
    });
  }

  private buildForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null),
    });
  }

}
