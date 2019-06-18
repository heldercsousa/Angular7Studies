import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  itemAdded = new Subject<Ingredient>();

  private ingredients : Ingredient [] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getItems() {
    return this.ingredients.slice(); //a copy
  }

  addItem(ingred:Ingredient) {
    this.ingredients.push(ingred);
    this.itemAdded.next(ingred); //subject uses next to emit an event or send a new value
  }

  addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addItem(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.itemAdded.next(ingredients['Apples']);//any here, doesn´t matter in this case, since subscribers have to update entire list anyway
  }
}
