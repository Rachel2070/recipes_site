import { Component } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Recipe } from '../models/recipe.model';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2'
import { TYPE } from './values.constants'


@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatDividerModule, MatIconModule, CommonModule],
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent {
  constructor(private _router: Router, private _recipeService: RecipeService, private _activatedRoute: ActivatedRoute) { }

  public addRecipeForm: FormGroup = new FormGroup({
    recipeName: new FormControl("", Validators.required),
    categoryId: new FormControl("", Validators.required),
    recipePreparation: new FormArray([new FormControl("", Validators.required)]),
    recipeIngredients: new FormArray([new FormControl("", Validators.required)]),
    recipeDurationM: new FormControl("", Validators.required),
    recipeLevel: new FormControl("", [Validators.required]),
    recipeImage: new FormControl("", [Validators.required, this.imageLinkValidator()])
  });

  get recipeIngredients(): FormArray {
    return this.addRecipeForm.get('recipeIngredients') as FormArray;
  }

  get recipePreparation(): FormArray {
    return this.addRecipeForm.get('recipePreparation') as FormArray;
  }

  public setCategortId(e: Event) {
    const x = e.target as HTMLSelectElement;
    const choosen = x.value;
    this.addRecipeForm.controls['categoryId'].setValue(choosen);
  }

  public onIngredientInput(index: number) {
    if (this.recipeIngredients.at(index).value !== "" && index === this.recipeIngredients.length - 1) {
      this.recipeIngredients.push(new FormControl(""));
    } else if (this.recipeIngredients.at(index).value === "" && this.recipeIngredients.length > 1 && !this.recipeIngredients.at(index).hasValidator(Validators.required)) {
      this.recipeIngredients.removeAt(index);
    }
  }

  public onPreparationInput(index: number) {
    if (this.recipePreparation.at(index).value !== "" && index === this.recipePreparation.length - 1) {
      this.recipePreparation.push(new FormControl(""));
    } else if (this.recipePreparation.at(index).value === "" && this.recipePreparation.length > 1 && !this.recipePreparation.at(index).hasValidator(Validators.required)) {
      this.recipePreparation.removeAt(index);
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
      title: 'Recipe was successfully added'
    })
  }

  public recipe!: Recipe

  public addRecipe() {
    const userId = this._activatedRoute.snapshot.paramMap.get('userId');
    if (this.recipeIngredients.length > 1) this.recipeIngredients.removeAt(this.recipeIngredients.length - 1)
    if (this.recipePreparation.length > 1) this.recipePreparation.removeAt(this.recipePreparation.length - 1)
    let recipeData = this.addRecipeForm.value;
    recipeData.userId = userId;
    recipeData.addRecipeTime = new Date()
    this.recipe = recipeData
    this._recipeService.addRecipe(this.recipe).subscribe({
      next: (res) => {
        this.toast()
        this._router.navigate([`${userId}/allRecipes`]);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  imageLinkValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      const imageExtensions = /\.(jpeg|jpg|png|bmp|tiff)$/i;

      if (!value || !value.match(/^https?:\/\/.*\.(jpeg|jpg|png|bmp|tiff)$/i)) {
        return { invalidImageLink: true };
      }
      return null;
    };
  }

}
