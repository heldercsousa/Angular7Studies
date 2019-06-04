// import { Component, OnInit, Input, AfterContentInit, EventEmitter, Output } from '@angular/core';
import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit, AfterContentInit {
  @Input() recipe : Recipe;
  // @Output() recipeSelected = new EventEmitter<void>();
  
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    console.log(this.recipe);
  }

  onSelected() {
    this.recipeService.recipeSelected.emit(this.recipe);
  }
}
