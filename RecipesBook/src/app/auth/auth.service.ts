import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
  email: string;
  id: string;
  _token: string;
  _expirationDate: Date;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);  //it allows access to the previous emitted value even if you just subscribed to it. Param null means we start off with no user
  
  constructor(private http: HttpClient) { 
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
      debugger;
      const user = new User(resData.email, resData.id, resData._token, new Date(resData._expirationDate));
      this.user.next(user);
    }));
  }

  private handleError(errorResp: HttpErrorResponse) {
    let defaultError = 'Um erro desconhecido ocorreu';
    return throwError(defaultError);
  }
}
