// import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  // @Output() recipeWasSelected = new EventEmitter<Recipe>();
  
  recipes: Recipe[];
  recipeUpdSubs: Subscription;
  
  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute, private dataStore: DataStorageService) { }

  ngOnInit() {
    this.dataStore.fetchRecipes();
    this.recipeUpdSubs = this.recipeService.recipesUpdated.subscribe(()=> {
      this.recipes = this.recipeService.getRecipes();
    });
  }

  onNewClicked() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  // onRecipeSelected(selected: Recipe) {
  //   // this.recipeWasSelected.emit(selected);
  // }
  ngOnDestroy(): void {
    this.recipeUpdSubs.unsubscribe();
  }
}
