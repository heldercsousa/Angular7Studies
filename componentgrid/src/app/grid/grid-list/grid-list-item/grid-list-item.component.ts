import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grid-list-item',
  templateUrl: './grid-list-item.component.html',
  styleUrls: ['./grid-list-item.component.css']
})
export class GridListItemComponent implements OnInit {
  @Input() listItem: {col1: string, col2:string, col3:string };

  constructor() { }

  ngOnInit() {
  }

}
