import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Recipe book';
  currentLink = 0;
  onHeaderLinkClicked(numb: number) {
    this.currentLink = numb;
  }
}
