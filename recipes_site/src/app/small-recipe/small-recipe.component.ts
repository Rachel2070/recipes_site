import { Component, Input } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../models/recipe.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-small-recipe',
  standalone: true,
  imports: [],
  templateUrl: './small-recipe.component.html',
  styleUrl: './small-recipe.component.css'
})
export class SmallRecipeComponent {

  constructor (private _router: Router, private _activatedRoute: ActivatedRoute) { }

  @Input() recipe!: Recipe

  public details(){
    const userId = this._activatedRoute.snapshot.paramMap.get('userId');
    this._router.navigate([`${userId}/recipeDetail/${this.recipe.recipeId}`])
  }
}
