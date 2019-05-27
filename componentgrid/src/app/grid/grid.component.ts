import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  input1: string;
  input2: string;
  input3: string;

  constructor() { }

  ngOnInit() {
  }

}
