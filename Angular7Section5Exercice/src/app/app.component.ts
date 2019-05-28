import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular7Section5Exercice';
  oddNumbers: number[] = [];
  evenNumbers: number[] = [];

  onIntervalFired(numb: number) {
    if (numb % 2 === 0)
    {
      this.evenNumbers.push(numb);
    }
    else
    {
      this.oddNumbers.push(numb);
    }
    console.log(numb);
  }
}
