import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { AuthComponent } from './auth/auth.component';

//pathMatch:"full" only redirects if the full path is empty
const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', component: RecipesComponent , children: [
    { path: '', component: RecipeStartComponent },
    { path: 'new', component: RecipeEditComponent }, //has to come before dynamic params ':id', otherwise Angular shall try to solve by using ':id'
    { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] }, // angular will run this resolver before loading this route. So, whenever this route gets loaded, resolver will run dataStorageService.fetchRecipes(), avoiding recipes array been empty

    { path: ':id/edit', component: RecipeEditComponent },
  ]},
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent },
];

//exports: [RouterModule] required since we are in an extra module and we want it working in the main module
@NgModule({
  declarations: [],
  imports: [                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
    CommonModule,
    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
