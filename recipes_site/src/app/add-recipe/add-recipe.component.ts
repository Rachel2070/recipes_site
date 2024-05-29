import { Component } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css'
})
export class AddRecipeComponent {
  constructor(private _router: Router, private _recipeService: RecipeService) { }

  public addRecipeForm: FormGroup = new FormGroup({
    "RecipeName": new FormControl("", Validators.required),
    "CategoryId": new FormControl("", Validators.required),
    "RecipePreparation": new FormControl("", Validators.required),
    "RecipeIngredients": new FormControl("", Validators.required),
    "RecipeDurationM": new FormControl("", Validators.required),
    "RecipeLevel": new FormControl("", Validators.required),
    "AddRecipeTime": new FormControl("", Validators.required),
    "RecipeImage": new FormControl("", Validators.required)
  });
}
