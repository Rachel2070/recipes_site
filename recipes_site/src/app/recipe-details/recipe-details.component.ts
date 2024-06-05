import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { TYPE } from '../add-recipe/values.constants';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'] // Note the plural 'styleUrls'
})
export class RecipeDetailsComponent implements OnInit {

  public recipe!: Recipe;
  public loaded = false;
  public creatore = false;
  public category!: Category;

  constructor(
    private _recipeService: RecipeService,
    private _activatedRoute: ActivatedRoute,
    private _categoryService: CategoryService,
    private _router: Router
  ) { }

  ngOnInit() {
    const id = this._activatedRoute.snapshot.paramMap.get('recipe');
    const userId = this._activatedRoute.snapshot.paramMap.get('userId');
    if (id) {
      this._recipeService.getRecipeById(id).subscribe({
        next: (res) => {
          this.recipe = res;
          this.getCategory();
          this.loaded = true;
          if (userId == this.recipe.userId) {
            this.creatore = true
          }
        },
        error: (err) => {
          console.log("error is", err);
        }
      });
    }
  }

  getCategory() {
    this._categoryService.getCategoryById(this.recipe.categoryId).subscribe({
      next: (res) => {
        this.category = res;
      },
      error: (err) => {
        console.log("error is", err);
      }
    });
  }

  editRecipe() {
    const userId = this._activatedRoute.snapshot.paramMap.get('userId');
    this._router.navigate([`${userId}/editRecipe/${this.recipe.recipeId}`])
  }

  deleteRecipe() {
    const id = this._activatedRoute.snapshot.paramMap.get('recipe');
    const userId = this._activatedRoute.snapshot.paramMap.get('userId');
    if (id) {
      this._recipeService.deleteRecipe(id).subscribe({
        next: (res) => {
          this.toast();
          this._router.navigate([`${userId}/allRecipes`]);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  show(typeIcon = TYPE.SUCCESS) {
    Swal.fire({
      title: 'Error!',
      text: 'Do you want to continue',
      icon: typeIcon,
      confirmButtonText: 'Cool'
    });
  }

  toast(typeIcon = TYPE.SUCCESS, timerProgressBar: boolean = false) {
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      icon: typeIcon,
      timerProgressBar,
      timer: 3000,
      title: 'Recipe was successfully deleted'
    });
  }
}
