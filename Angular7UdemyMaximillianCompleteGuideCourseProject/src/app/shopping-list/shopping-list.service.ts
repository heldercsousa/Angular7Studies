import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  itemAdded = new Subject<Ingredient>();
  startedEditing = new Subject<number>();

  private ingredients : Ingredient [] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getItems() {
    return this.ingredients.slice(); //a copy
  }

  getItem(index: number) {
    return this.ingredients[index];
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

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.itemAdded.next(newIngredient); 
  }

  removeItem(index: number) {
    this.ingredients.splice(index, 1);
    this.itemAdded.next(null);
  }

}
