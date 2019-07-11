import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
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
      postData
    )
    .subscribe(posts => {

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
        params: searchParams
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
    return this.http.delete('http://localhost:53244/api/todo')
      .pipe(
        map(responseData => {
          return responseData;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }
}
