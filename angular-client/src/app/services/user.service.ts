import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  private isUserLoggedIn;
  constructor() {
    this.isUserLoggedIn = false;
  }

  setUserLoggedIn() {
    localStorage.setItem('isUserLoggedIn', 'true');
    this.isUserLoggedIn = true;
  }
  getUserLoggedIn() {
    const storageUserLogin = localStorage.getItem('isUserLoggedIn');
    const isUserLoggedIn = (storageUserLogin === 'true');
    return isUserLoggedIn;
  }

}
