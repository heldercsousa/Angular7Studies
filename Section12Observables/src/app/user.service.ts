import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root' //makes prividers property declaration unnecessary on app.module
})
export class UserService {
  activatedEmitter = new Subject<boolean>();
  constructor() { }
}
