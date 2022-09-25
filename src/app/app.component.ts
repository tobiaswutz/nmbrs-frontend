import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { NotificationService } from './core/services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private auth: AuthService,
    private ntf: NotificationService
  ) { }

  public logedin(): boolean {
    return this.auth.isAuthenticated();
  }

  title = 'trading-tracker';
}
