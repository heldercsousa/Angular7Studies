import { Directive, Renderer2, ElementRef, OnInit, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {

  @Input() defaultColor: string='transparent';
  @Input() highlightColor: string='blue';
  //'' defines which property of the host we want to bind. Camelcase is important
  //you can bind to any property on the element HostBinding is sitting on
  @HostBinding('style.backgroundColor') backgroundColor: string;// = 'transparent'; 

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.backgroundColor = this.defaultColor;
    //this.elRef.nativeElement.style.backgroundColor = 'green';
    //this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue'); //should use the Renderer for any DOM manipulations.
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
    this.backgroundColor = this.defaultColor;
  }
}
