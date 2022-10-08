import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export class ModalData {
  constructor(
    public title: string,
    public message: string,
    public confirmText: string,
    public cancelText: string,
  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public newModal = new Subject<ModalData>();

  constructor() { }
  
  public createModal(title: string, message: string, confirmText: string, cancelText: string) {
    this.newModal.next(new ModalData('hallo', message, confirmText, cancelText));
  }

}
