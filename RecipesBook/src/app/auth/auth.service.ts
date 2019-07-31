import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface AuthResponseData {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { 
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      environment.apiBaseUrl + '/token',
      {
        Email : email,
        Password : password
      }
    )
    .pipe(catchError(errorResp => {
        let defaultError = 'Um erro desconhecido ocorreu';
        return throwError(defaultError);
    }));
  }
}
