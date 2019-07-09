import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
    return this.http.get('http://localhost:53244/api/todo')
    .pipe(
      map(responseData => {
        const postArray = [];
// tslint:disable-next-line: forin
        for (const key in responseData) {
          postArray.push({ ...responseData[key], id: key });
        }
        return postArray;
      })
    );
  }

  clearPosts() {
    return this.http.delete('http://localhost:53244/api/todo');
  }
}
