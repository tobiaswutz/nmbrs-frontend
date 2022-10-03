import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  selectedMenuIndex: number = 0;
  public user: any;
  public sidebarOpen: boolean = true;
  public disabled: boolean = false;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  @Input() menuItems: any[] = ['Dashboard', 'Users', 'Settings'];

  ngOnInit() {
    this.user = this.userService.getUserInfo();
    this.route.url.subscribe(() => {
      console.log(this.location.path());

      if (this.location.path() === '/auth') {
        this.disabled = true;
        console.log('disabled');
        
      } else {
        this.sidebarOpen = true;
        this.disabled = false;
        console.log('enabled');
      }
    });
  }

  public toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  public logout(): void {
    this.auth.logout();
  }

}
