import { Injectable } from "@angular/core";
import { lastValueFrom, Observable, Subject } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthResponseTokenObj, JWTDecoded } from "../models/auth";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { UserService } from "./user.service";
import { User } from "../models/user";
import { NotificationService } from "./notification.service";
import { WebService } from "./web.service";



@Injectable()
export class AuthService {

  private baseUrl = 'https://nest-server-production.up.railway.app/';

  public loggedIn: Subject<boolean> = new Subject<boolean>();
  public userData: JWTDecoded | undefined | User;


  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private ntf: NotificationService,
    private web: WebService
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

  public async login(email: string, password: string): Promise<void> {
    const res: any = await this.web.postCall("auth/signin", { email, password });
    if (!res) { return; }
    this.setSession(res.access_token);
    this.router.navigate(["/dashboard"]);
    this.ntf.success("You are logged in");

  }

  public async signup(email: string, password: string, firstName: string, lastName: string): Promise<void> {
    const res: any = await this.web.postCall("auth/signup", { email, password, firstName, lastName });
    if (!res) { return; }
    this.setSession(res.access_token);
    this.router.navigate(["/dashboard"]);
    this.ntf.success("Account erstellt");
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