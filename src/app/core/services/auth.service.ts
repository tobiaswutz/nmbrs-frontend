import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthResponseTokenObj, JWTDecoded } from "../models/auth";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { UserService } from "./user.service";
import { User } from "../models/user";



@Injectable()
export class AuthService {

  private baseUrl = 'https://nest-server-production.up.railway.app/';

  public loggedIn: Subject<boolean> = new Subject<boolean>();
  public userData: JWTDecoded | undefined | User;


  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) { }

  public isAuthenticated(): boolean {
    const helper = new JwtHelperService();
    const token = localStorage.getItem("token");
    if (!token) { return false; }
    const expired: boolean = helper.isTokenExpired(token);
    if (expired) { this.logout(); return false; }
    this.setSession(token);
    return true;
  }

  public signup(email: string, password: string, firstName: string, lastName: string): void {
    const res: Observable<any> = this.http.post(this.baseUrl + "auth/signup", { email, password, firstName, lastName }, { observe: 'response' });
    res.subscribe({
      next: (response) => {
        this.setSession(response.body.access_token);
        this.router.navigate(["/dashboard"]);
      },
      error: (error) => {
        alert(error.error.message);
      }
    });
  }

  public login(email: string, password: string): void {
    const res: Observable<any> = this.http.post(this.baseUrl + "auth/signin", { email, password });
    res.subscribe({
      next: (response) => {
        this.setSession(response.access_token);
        this.router.navigate(["/dashboard"]);
      },
      error: (error) => {
        alert(error.error.message);
      }
    });
  }

  public logout(): void {
    localStorage.removeItem("token");
    this.loggedIn.next(false);
    this.router.navigate(["/auth"]);
  }

  private setSession(token: string) {
    localStorage.setItem("token", token);
    const helper = new JwtHelperService();
    this.userData = helper.decodeToken(token)
    this.userService.setUserInfo(this.userData);
    this.loggedIn.next(true);
  }
}