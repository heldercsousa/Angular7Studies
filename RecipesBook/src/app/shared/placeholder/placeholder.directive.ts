import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]'
})
export class PlaceholderDirective {
  // ViewContainerRef gives access to the component we´re using this directive
  constructor(public viewContainerRef: ViewContainerRef) { }
}
