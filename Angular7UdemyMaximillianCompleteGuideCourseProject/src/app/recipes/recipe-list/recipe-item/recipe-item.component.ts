// import { Component, OnInit, Input, AfterContentInit, EventEmitter, Output } from '@angular/core';
import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit, AfterContentInit {
  @Input() recipe : Recipe;
  // @Output() recipeSelected = new EventEmitter<void>();
  @Input() index: number;
  
  constructor(private recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    //console.log(this.recipe);
  }

  // onSelected() {
  //   //this.recipeService.recipeSelected.emit(this.recipe);

  // }
}
