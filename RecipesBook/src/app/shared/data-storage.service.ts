import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';
import { FormGroup } from '@angular/forms';
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
    // exhaustMap waits for the observable until complete. Inside it we return an new observable
    // we are interested in catch just one value from user subject
    return this.authService.user.pipe(take(1), 
    exhaustMap(user => {
      let headerr = new HttpHeaders();
      headerr.set('Content-Type', 'application/json');
      if (user) {
        headerr.set('Bearer ',user.token);
      }
      return this.http.get<Recipe[]>('http://localhost:8888/api/recipes', 
      {
        headers: headerr
        //params: new HttpParams().set('auth', user?user.token:'')
      }) //in the end we have a Http Observable
    }), 
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
