import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  selectedMenuIndex: number = 0;

  constructor(
    private auth: AuthService,
  ) { }

  @Input() menuItems: any[] = ['Dashboard', 'Users', 'Settings'];

  ngOnInit() {
  }

  public logout(): void {
    this.auth.logout();
  }

}
