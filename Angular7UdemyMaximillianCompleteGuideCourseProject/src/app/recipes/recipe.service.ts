import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new Subject<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('A Test Recipe','This is simple','https://media.timeout.com/images/102063911/image.jpg', [new Ingredient("Apple", 2), new Ingredient('Brice', 1)]),
    new Recipe('Second recipe', 'This is a second one', 'https://img.taste.com.au/UCkD8VfP/w1200-h630-cfill/taste/2016/11/chicken-and-prosciutto-parmigiana-79468-1.jpeg', [new Ingredient("Water Mellon", 1), new Ingredient('Orange Juice', 4)]),
    new Recipe('Third recipe', 'This is a third one', 'https://img1.cookinglight.timeinc.net/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/2016/09/main/_1501p108-weeknight-lemon-chicken-skillet-dinner.jpg?itok=Dpd4oeTK', [new Ingredient("Beans", 4), new Ingredient('Tommatoes', 2)]),
    new Recipe('Fourth recipe', 'This is the fourth one', 'https://hips.hearstapps.com/del.h-cdn.co/assets/18/06/1600x800/landscape-1517928338-delish-mongolian-ramen-and-meatballs-still001.jpg?resize=640:*', [new Ingredient("flowers",1), new Ingredient("bread",2), new Ingredient("Bread", 4)]),
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice(); //return a new array copy, avoiding returning a reference
  }

  addIngredientesToShoppingList(ingredientes: Ingredient[]) {
    this.slService.addIngredients(ingredientes);
  }
  
  getRecipe(index: number) {
    return this.recipes[index];    
  }
}
