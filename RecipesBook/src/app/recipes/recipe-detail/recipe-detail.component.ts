import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  // @Input() recipe : Recipe;
  recipe : Recipe;
  id: number;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router, private dataStore: DataStorageService) { }

  ngOnInit() {
      this.route.params.subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
        }
      );
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientesToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route }); //in this case, we dont need the id, since its relative
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route }); //works like before, but building a complete path from scratch
  }

  onDeleteRecipe() {
    this.dataStore.deleteRecipe(this.recipe.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
