import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.css']
})
export class DashboardViewComponent implements OnInit {

  public sidebarOpen: boolean = false;

  public user: any;

  constructor(
    private authService: AuthService,
    private ntf: NotificationService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.user = this.userService.getUserInfo();
    console.log(this.user);
    
  }

  public note(): void {
    this.ntf.success('Hello world');
  }

  public toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  public logout(): void {
    this.authService.logout();
  }

}
