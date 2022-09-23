import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public user: any = null;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }
  ngOnInit() {
    console.log('DashboardComponent.ngOnInit()');

    this.user = this.userService.getUserInfo();
  }

  public logout(): void {
    this.authService.logout();
  }

}
