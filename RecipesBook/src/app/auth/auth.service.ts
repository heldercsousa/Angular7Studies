import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { load } from '@angular/core/src/render3';
import { TouchSequence } from 'selenium-webdriver';

export interface AuthResponseData {
  email: string;
  id: string;
  _token: string;
  _tokenExpirationDate: number;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);  //it allows access to the previous emitted value even if you just subscribed to it. Param null means we start off with no user
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { 
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      environment.apiBaseUrl + '/token',
      {
        Email : email,
        Password : password
      }
    )
    .pipe(catchError(this.handleError), tap(resData => {
      // debugger;
      const expirationDate = new Date(new Date().getTime() + resData._tokenExpirationDate * 1000);
      const user = new User(resData.email, resData.id, resData._token, expirationDate);
      localStorage.setItem('userData', JSON.stringify(user)); //JSON.stringify converts javascript object to string
      this.user.next(user);
      this.autoLogout(resData._tokenExpirationDate * 1000);
    }));
  }

  autoLogin() {
    const userData : {
      email: string,
      id: string, 
      _token: string, 
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime(); //diference in milliseconds
      this.autoLogout(expirationDuration);
    }
  }

  logOut() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => { this.logOut() }, expirationDuration);
  }

  private handleError(errorResp: HttpErrorResponse) {
    let defaultError = 'Um erro desconhecido ocorreu';
    return throwError(defaultError);
  }
}
