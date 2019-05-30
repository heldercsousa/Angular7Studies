import { Component, OnInit, Input, AfterContentInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit, AfterContentInit {
  @Input() recipe : Recipe;
  @Output() recipeSelected = new EventEmitter<void>();
  
  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    console.log(this.recipe);
  }

  onSelected() {
    this.recipeSelected.emit();
  }
}
