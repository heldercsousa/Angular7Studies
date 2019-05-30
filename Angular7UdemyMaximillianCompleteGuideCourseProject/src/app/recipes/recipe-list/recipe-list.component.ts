import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  
  recipes: Recipe[] = [
    new Recipe('A Test Recipe','This is simple','https://media.timeout.com/images/102063911/image.jpg'),
    new Recipe('Second recipe', 'This is a second one', 'https://img.taste.com.au/UCkD8VfP/w1200-h630-cfill/taste/2016/11/chicken-and-prosciutto-parmigiana-79468-1.jpeg'),
    new Recipe('Third recipe', 'This is a third one', 'https://img1.cookinglight.timeinc.net/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/2016/09/main/_1501p108-weeknight-lemon-chicken-skillet-dinner.jpg?itok=Dpd4oeTK'),
    new Recipe('Fourth recipe', 'This is the fourth one', 'https://hips.hearstapps.com/del.h-cdn.co/assets/18/06/1600x800/landscape-1517928338-delish-mongolian-ramen-and-meatballs-still001.jpg?resize=640:*'),
  ];

  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(selected: Recipe) {
    this.recipeWasSelected.emit(selected);
  }
}
