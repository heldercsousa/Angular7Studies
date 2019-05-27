import { Component, OnInit, Input, ViewEncapsulation, OnChanges, SimpleChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated //None, Native
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  //by default, components elements are accecible only inside this component, not outside it.
  //So, it needs to be exposed to the world somehow. It is done by using decorator @Input.
  //This way, any parent component tha is using app-server-element will be able to bind to this property
  @Input('srvElement') element: {type: string, name:string, content:string};
  @Input() name : string; 

  constructor() { 
    console.log('constructor called');
  }

  //do something with the value when something changes
  ngOnChanges(changes: SimpleChanges) {
    console.log("ngOnChange called");
    console.log(changes);
  }

  ngOnInit() {
    console.log("ngOnInit called");
  }

  ngDoCheck() {
    console.log("ngDoCheck called!");
  }

  ngAfterContentInit() {
    console.log("ngAfterContentInit called")
  }

  ngAfterContentChecked() {
    console.log("ngAfterContentChecked called")
  }

  ngAfterViewInit () {
    console.log("ngAfterViewInit called")
  }

  ngAfterViewChecked() {
    console.log("ngAfterViewChecked called")
  }

  ngOnDestroy() {
    console.log("ngOnDestroy called")
  }
}
