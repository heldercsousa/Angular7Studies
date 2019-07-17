import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients : Ingredient[];
  private itemAddedSub: Subscription;

  constructor(private shoppinglistService: ShoppingListService ) { }

  ngOnInit() {
    this.ingredients = this.shoppinglistService.getItems();
    this.itemAddedSub = this.shoppinglistService.itemAdded.subscribe((ingre: Ingredient) => this.ingredients = this.shoppinglistService.getItems()); //ingredient param is provided by the subject
  }

  ngOnDestroy():void {
    this.itemAddedSub.unsubscribe();
  }

  onEditItem(index: number) {
    this.shoppinglistService.startedEditing.next(index);
  }
}