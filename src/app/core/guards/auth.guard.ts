import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  public canActivate(): boolean {
    let isLoggedIn = this.authService.isAuthenticated();
    if (isLoggedIn) {
      console.log('CanActivate returning true');
      return true
    } else {
      console.log('CanActivate returning false');
      this.router.navigate(['/auth']);
      return false;
    }
  }
  
}
