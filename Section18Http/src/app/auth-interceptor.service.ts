import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
// basicly such a service
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }
  // runs right before the http request leaves our application
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('Request is on its way');
    // a chance to modify the request
    const modifiedRequest = req.clone({
      headers: req.headers.append('Auth', 'xyz')
    });
    // return next.handle(modifiedRequest); // standard request. We interact over a request object
    return next.handle(modifiedRequest) // we may also interact over the response by using pipe.
    .pipe(
      tap(event => {
       /* console.log(event);
        if (event.type === HttpEventType.Response) {
          console.log('Response arrived, body data');
          console.log(event.body); // response body been logged
        }*/
      })
    );

  }
}
