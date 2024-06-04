import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

import { Recipe } from '../models/recipe.model';

import Swal from 'sweetalert2'
import { TYPE } from '../add-recipe/values.constants';

import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-recipe',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {
  public recipe!: Recipe;
  public loaded = false;
  public recipeId!:string

  constructor(
    private _router: Router,
    private _recipeService: RecipeService,
    private _activatedRoute: ActivatedRoute
  ) {}

  public editRecipeForm: FormGroup = new FormGroup({
    recipeName: new FormControl('', Validators.required),
    categoryId: new FormControl('', Validators.required),
    recipeIngredients: new FormArray([]),
    recipePreparation: new FormArray([]),
    recipeDurationM: new FormControl('', Validators.required),
    recipeLevel: new FormControl('', Validators.required),
    recipeImage: new FormControl('', Validators.required)
  });

  ngOnInit() {
    const id = this._activatedRoute.snapshot.paramMap.get('recipe');
    if (id) {
      this._recipeService.getRecipeById(id).subscribe({
        next: (res) => {
          this.recipe = res;
          this.loaded = true;
          this.recipeId = res.recipeId || ""
          this.initializeForm();
        },
        error: (err) => {
          console.log("error is", err);
        }
      });
    }
  }

  private initializeForm() {
    this.editRecipeForm.patchValue({
      recipeName: this.recipe.recipeName,
      categoryId: this.recipe.categoryId,
      recipeDurationM: this.recipe.recipeDurationM,
      recipeLevel: this.recipe.recipeLevel,
      recipeImage: this.recipe.recipeImage
    });

    // Initialize form arrays
    this.recipe.recipeIngredients.forEach((ingredient: string, index: number) => {
      const control = new FormControl(ingredient, index === 0 ? Validators.required : null);
      this.recipeIngredients.push(control);
    });

    this.recipe.recipePreparation.forEach((preparation: string, index: number) => {
      const control = new FormControl(preparation, index === 0 ? Validators.required : null);
      this.recipePreparation.push(control);
    });
  }

  get recipeIngredients(): FormArray {
    return this.editRecipeForm.get('recipeIngredients') as FormArray;
  }

  get recipePreparation(): FormArray {
    return this.editRecipeForm.get('recipePreparation') as FormArray;
  }

  public setCategortId(e: Event) {
    const x = e.target as HTMLSelectElement;
    const choosen = x.value;
    this.editRecipeForm.controls['categoryId'].setValue(choosen);
  }

  public onIngredientInput(index: number) {
    const control = this.recipeIngredients.at(index);
    if (control.value !== "" && index === this.recipeIngredients.length - 1) {
      this.recipeIngredients.push(new FormControl("", null));
    } else if (control.value === "" && this.recipeIngredients.length > 1 && !control.hasValidator(Validators.required)) {
      this.recipeIngredients.removeAt(index);
    }
    // Ensure the first ingredient is always required
    if (this.recipeIngredients.length > 0) {
      this.recipeIngredients.at(0).setValidators(Validators.required);
    }
  }

  public onPreparationInput(index: number) {
    const control = this.recipePreparation.at(index);
    if (control.value !== "" && index === this.recipePreparation.length - 1) {
      this.recipePreparation.push(new FormControl("", null));
    } else if (control.value === "" && this.recipePreparation.length > 1 && !control.hasValidator(Validators.required)) {
      this.recipePreparation.removeAt(index);
    }
    // Ensure the first preparation is always required
    if (this.recipePreparation.length > 0) {
      this.recipePreparation.at(0).setValidators(Validators.required);
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
      timer: 5000,
      title: 'Recipe was successfully updated'
    });
  }

  public editRecipe() {
    const userId = this._activatedRoute.snapshot.paramMap.get('userId');
    if (this.recipeIngredients.length > 1) this.recipeIngredients.removeAt(this.recipeIngredients.length - 1);
    if (this.recipePreparation.length > 1) this.recipePreparation.removeAt(this.recipePreparation.length - 1);
    let recipeData = this.editRecipeForm.value;
    recipeData.userId = userId;
    recipeData.recipeId = this.recipe.recipeId
    recipeData.addRecipeTime = this.recipe.addRecipeTime

    console.log(recipeData);
    console.log(this.recipe);
    
    
    this._recipeService.updateRecipe(recipeData).subscribe({
      next: (res) => {
        this.toast();
        this._router.navigate([`${userId}/allRecipes`]);
      },
      error: (err) => {
        console.log(recipeData)
        console.log(err);
      }
    });
  }

  public cancel(){
    const userId = this._activatedRoute.snapshot.paramMap.get('userId');
    this._router.navigate([`${userId}/recipeDetail/${this.recipe.recipeId}`])  }
}
