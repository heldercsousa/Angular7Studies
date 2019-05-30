import { Component, Output, EventEmitter } from '@angular/core';

@Component ({
 selector: 'app-header',
 templateUrl: './header.component.html'
})
export class HeaderComponent {
    @Output() linkClicked = new EventEmitter<number>();

    onLinkClick(idx: number) {
      this.linkClicked.emit(idx);
      console.log("idx clicado:" + idx);
    }
  
}