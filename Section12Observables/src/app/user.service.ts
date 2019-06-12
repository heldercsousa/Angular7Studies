import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root' //makes prividers property declaration unnecessary on app.module
})
export class UserService {
  activatedEmitter = new EventEmitter<boolean>();
  constructor() { }
}
