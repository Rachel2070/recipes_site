import { Component } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';
import { CommonModule } from '@angular/common';
import { SmallRecipeComponent } from '../small-recipe/small-recipe.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';


import Swal from 'sweetalert2';
import { TYPE } from '../add-recipe/values.constants';
// import { SearchComponent } from '../search/search.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-recipe',
  standalone: true,
  imports: [CommonModule, SmallRecipeComponent, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './all-recipe.component.html',
  styleUrl: './all-recipe.component.css'
})
export class AllRecipeComponent {

  public recipeList!: Recipe[]
  public filteredRecipeList: Recipe[] = [];
  public searchRecipeName = '';
  public searchCategory = '';
  public searchDuration = 0;

  constructor(private _router: Router, private _activatedRoute: ActivatedRoute, private _recipeService: RecipeService) { }

  ngOnInit(): void {
    this._recipeService.getRecipeList().subscribe({
      next: (res) => {
        this.recipeList = res
        this.filteredRecipeList = this.recipeList; 
      },
      error: (err) => {
        console.log("error")
      }
    })
  }

  filterRecipes() {
    this.filteredRecipeList = this.recipeList.filter((recipe) => {
      console.log(this.searchCategory)
      const matchesName = this.searchRecipeName === '' || recipe.recipeName.toLowerCase().includes(this.searchRecipeName.toLowerCase());
      const matchesCategory = this.searchCategory === '' || recipe.categoryId === this.searchCategory;
      const matchesDuration = this.searchDuration === 0 || recipe.recipeDurationM <= this.searchDuration;

      return matchesName && matchesCategory && matchesDuration;
    });
  }

}
