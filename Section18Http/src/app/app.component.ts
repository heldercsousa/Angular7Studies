import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isLoading = false;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fectchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.http
      .post(
        'http://localhost:53244/api/todo',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    this.fectchPosts();
  }

  onClearPosts() {
  }

  private fectchPosts() {
    this.isLoading = true;
    this.http.get('http://localhost:53244/api/todo')
    .pipe(
      map(responseData => {
        const postArray = [];
// tslint:disable-next-line: forin
        for (const key in responseData) {
          postArray.push({ ...responseData[key], id: key });
        }
        return postArray;
      })
    )
    .subscribe(posts => {
      this.isLoading = false;
      this.loadedPosts = posts;
    });
  }
}
