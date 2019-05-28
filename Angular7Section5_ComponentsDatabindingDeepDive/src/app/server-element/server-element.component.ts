import { Component, OnInit, Input, ViewEncapsulation, OnChanges, SimpleChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, ViewChild, ElementRef, ContentChild } from '@angular/core';

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
  @ViewChild('heading') header: ElementRef;
  @ContentChild('contentParagraph') paragraph: ElementRef;

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
    console.log('text content:' + this.header.nativeElement.textContent);
    console.log('text content from parent paragraph:' + this.paragraph.nativeElement.textContent);
  }

  ngDoCheck() {
    console.log("ngDoCheck called!");
  }

  ngAfterContentInit() {
    console.log("ngAfterContentInit called")
    console.log('text content from parent paragraph:' + this.paragraph.nativeElement.textContent);
  }

  ngAfterContentChecked() {
    console.log("ngAfterContentChecked called")
  }

  ngAfterViewInit () {
    console.log("ngAfterViewInit called")
    console.log('text content:' + this.header.nativeElement.textContent);
  }

  ngAfterViewChecked() {
    console.log("ngAfterViewChecked called")
  }

  ngOnDestroy() {
    console.log("ngOnDestroy called")
  }
}
