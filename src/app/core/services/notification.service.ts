
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from 'src/app/shared/components/notification/notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public message = new Subject<Message>();

  constructor() { }

  public success(title: string, content?: string) {
    if (!content) {
      content = title;
      title = 'Success';
    }
    this.message.next({ type: 'success', title, content });
  }

  public error(title: string, content?: string) {
    if (!content) {
      content = title;
      title = 'Error';
    }
    this.message.next({ type: 'error', title, content });
  }

  public warning(title: string, content?: string) {
    if (!content) {
      content = title;
      title = 'Warning';
    }
    this.message.next({ type: 'warning', title, content });
  }

  public info(title: string, content?: string) {
    if (!content) {
      content = title;
      title = 'Info';
    }
    this.message.next({ type: 'info', title, content });
  }
}