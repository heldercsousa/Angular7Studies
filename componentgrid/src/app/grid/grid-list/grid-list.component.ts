import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid-list',
  templateUrl: './grid-list.component.html',
  styleUrls: ['./grid-list.component.css']
})
export class GridListComponent implements OnInit {

  gridElements =  [
    { col1: 'col1'  , col2: 'col2'  , col3: 'col3'  },
    { col1: 'col21' , col2: 'col22' , col3: 'col23' },
    { col1: 'col31' , col2: 'col32' , col3: 'col33' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
