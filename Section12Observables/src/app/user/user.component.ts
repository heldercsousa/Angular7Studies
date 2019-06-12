import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRoute, private uerService: UserService) {
  }

  /*
  important note:
  for observables provided by Angular, we dont need to Unsubscribe, since Angular does it for use.
  Route.params is provided by Angular, automatically taking care about it.
  */
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
    });
  }

  onActivate(){
    //subject is a special kind of observable. This is the recommended way
    //prefer using Subject rather than EventEmitter and ordinary Observables, cause next may be called from outside.

    this.uerService.activatedEmitter.next(true); 
  }
    
}
