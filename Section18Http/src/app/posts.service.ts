import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs'; //throwError gives an observable

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  createAndStorePost(title: string, content: string) {
    const postData = { title: title, content: content };
    this.http
    .post(
      'http://localhost:53244/api/todo',
      postData,
      {
        observe: 'response'
      }
    )
    .subscribe(responseData => {
      console.log('1111');
      console.log(responseData.body);
    }, error => {
      this.error.next(error.message);
    });
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');

    return this.http
    .get(
      'http://localhost:53244/api/todo',
      {
        headers: new HttpHeaders({'Custom-Header': 'Hello'}),
        // params: new HttpParams().set('print', 'pretty')
        params: searchParams,
        responseType: 'json' 
      }
    )
    .pipe(
      map(responseData => {
        const postArray = [];
// tslint:disable-next-line: forin
        for (const key in responseData) {
          postArray.push({ ...responseData[key], id: key });
        }
        return postArray;
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  clearPosts() {
    return this.http.delete(
      'http://localhost:53244/api/todo',
      {
        observe: 'events',
        responseType:  'blob'//'json' json is the standard. 'blob' is used for files. 'text' if you dont want to convert to javascript object
      }
    )
    .pipe(
      tap(
        event => {
          console.log(event);
          if (event.type === HttpEventType.Sent) {
           // ...
          }
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        }
      ),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }
}
