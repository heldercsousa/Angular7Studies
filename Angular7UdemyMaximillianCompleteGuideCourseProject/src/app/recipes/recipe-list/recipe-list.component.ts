// import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  // @Output() recipeWasSelected = new EventEmitter<Recipe>();
  
  recipes: Recipe[];
  recipeUpdSubs: Subscription;
  
  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
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
