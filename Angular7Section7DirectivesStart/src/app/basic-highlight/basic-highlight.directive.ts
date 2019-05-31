import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
    selector: "[appBasicHighlight]", //squared Brackets makes selector usable like a property
})
export class BasicHighlighDirective implements OnInit {
    constructor(private elementRef: ElementRef) {//private makes this property a real class property
    }
    ngOnInit(){
        this.elementRef.nativeElement.style.backgroundColor = 'green';
    }
}