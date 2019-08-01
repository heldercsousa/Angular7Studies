// import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { debug } from 'util';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  // @Output() recipeWasSelected = new EventEmitter<Recipe>();
  
  recipes: Recipe[];
  recipeUpdSubs: Subscription;
  errorUnauthorized: boolean;  
  isAuthenticated: boolean;
  userSub: Subscription;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute, private dataStore: DataStorageService, private authService: AuthService) { }

  ngOnInit() {
    this.dataStore.fetchRecipes().subscribe(()=>{}, error => {
      if (error.status === 401) {
        this.errorUnauthorized = true;
        //this.router.navigate(['/auth']);
      }
    });
    this.recipeUpdSubs = this.recipeService.recipesUpdated.subscribe(()=> {
      this.recipes = this.recipeService.getRecipes();
    });
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user; //trick for the following - !user ? false : true; 
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

  get IsAuthenticated() {
    return this.isAuthenticated;
  }
}
