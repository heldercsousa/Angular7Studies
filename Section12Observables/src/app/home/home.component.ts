import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs'; //Observable actually are provided exclusively by rxjs library. Thats neither js nor angular
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;
  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = //stores the subscription, not the observable 
    // interval(1000) //returns an Observable which fires on each second. Thats not an entire observable made from scratch, but it´s close.
    // .subscribe( count => {
    //   console.log(count);
    // });

    //creating the same observable abve, but now a custom one from scratch
    const customIntervalObservable = Observable.create( observer => {
      let count = 0; //let is block-scope, var leaks the scope to the upward function
      setInterval( () => { //setInterval wrapped in our observable
        observer.next(count); //whenever setInterval fires, we let observer know about the count
        if (count===2)
          observer.complete(); //stops the observable, not throwing error anymore 
        if (count>3)
          observer.error(new Error('Count is greater 3!')); 
        count++;
      }, 1000);
    });

    this.firstObsSubscription = customIntervalObservable
    .pipe(
      filter(data => {
        return data > 0; //if returns false, the following steps are dropped
      }),
      map( (data:number)=>{
        return 'Round: ' + (data +1);
      })
    )
    .subscribe(count => { //now we subscribe to pipe, which may update the data somehow
      console.log(count);
    }, error => {
      console.log(error);
      alert(error.message);
    }, () => { //this is the complete handler
      console.log('completed');
    });
  }

  ngOnDestroy(): void {
      this.firstObsSubscription.unsubscribe(); //whenever we leave this component, the subscription is cleared, preventing memory leaks
  }
}
