import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userInfo: any

  constructor() { }
  
  public setUserInfo(user: any): void {
    this.userInfo = user;
  }

  public getUserInfo(): any {
    return this.userInfo;
  }

}
