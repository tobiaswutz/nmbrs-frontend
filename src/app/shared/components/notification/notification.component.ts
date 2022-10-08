
import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification.service';

type messageType = 'success' | 'error' | 'warning' | 'info';

export interface Message {
  type: messageType;
  title: string;
  content: string;
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  public notifications: Message[] = [];

  private alive: boolean = true;

  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.notificationService.message
      .pipe(takeWhile(() => this.alive))
      .subscribe(message => {
        this.note(message);
      });
  }

  ngOnDestroy() {
    this.alive = false
  }

  public abort(title: string): void {
    this.notifications = this.notifications.filter(message => message.title !== title);
  }

  public note(messaeg: Message) {
    this.notifications.push(messaeg);
    setTimeout(() => { this.notifications.shift(); }, 1500);
  }
}