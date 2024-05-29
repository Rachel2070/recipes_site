import { Component } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';
import { CommonModule } from '@angular/common';
import { SmallRecipeComponent } from '../small-recipe/small-recipe.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-all-recipe',
  standalone: true,
  imports: [CommonModule, SmallRecipeComponent, MatButtonModule],
  templateUrl: './all-recipe.component.html',
  styleUrl: './all-recipe.component.css'
})
export class AllRecipeComponent {
  
 public recipeList!: Recipe[]
 constructor (private _router: Router, private _activatedRoute: ActivatedRoute, private _recipeService: RecipeService) { }

  ngOnInit():void{
    this._recipeService.getRecipeList().subscribe({
      next: (res) => {
        this.recipeList=res
      },
      error: (err) => {
        console.log("error")
      }
    })
  }

  addRecipe(){
    const userId = this._activatedRoute.snapshot.paramMap.get('userId');
    this._router.navigate([`${userId}/addRecipe`])
  }
}
