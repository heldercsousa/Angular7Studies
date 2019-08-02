import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {
  }

  storeRecipes() {
   /* const recipes = this.recipeService.getRecipes();
    this.http.post('http://localhost:8888/api/recipes', recipes[0])
    .subscribe(response => {
      console.log(response);
    }); */
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('http://localhost:8888/api/recipes')
    .pipe(
      map(response => {
        return response.map( recipe => { // It´s a normal javascript array method.  Allow to transform the array into another pattern
          return {
            ...recipe, /// copy all the existing data in recipe object
            ingredients: recipe.ingredients ? recipe.ingredients : [] // returns an empty array if it is undefined
          };
        });
      }), 
      tap(recipes => { // tap allows to execute some code in place without altering the data
        this.recipeService.setRecipes(recipes);
      })
    );
  }

  addRecipe(recipeData: Recipe) {
    this.http.post<Recipe>('http://localhost:8888/api/recipes', recipeData)
    .subscribe(reciperesponse => {
      this.recipeService.addRecipe(reciperesponse);
    });
  }

  updateRecipe(recipeData: Recipe) {
    // resolver problemas com atualização dos dados da table one to many
    // https://www.learnentityframeworkcore.com/relationships/managing-one-to-many-relationships
    this.http.put('http://localhost:8888/api/recipes/' + recipeData.id, recipeData)
    .subscribe(reciperesponse => {
      this.fetchRecipes().subscribe();
      //this.recipeService.addRecipe(reciperesponse);
    });
  }

  deleteRecipe(recipeId: number) {
    this.http.delete('http://localhost:8888/api/recipes/'+recipeId).subscribe(recipeResponse => {
      this.fetchRecipes().subscribe();
    });
  }
}
