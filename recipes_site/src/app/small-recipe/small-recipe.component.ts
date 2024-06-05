import { Component, Input } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../models/recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import Swal from 'sweetalert2';
import { TYPE } from '../add-recipe/values.constants';
import { DurationPipe } from './duration.pipe';


@Component({
  selector: 'app-small-recipe',
  standalone: true,
  imports: [MatButtonModule, CommonModule, MatCardModule, MatButtonModule, DurationPipe],
  templateUrl: './small-recipe.component.html',
  styleUrl: './small-recipe.component.css'
})
export class SmallRecipeComponent {

  constructor(private _router: Router, private _activatedRoute: ActivatedRoute) { }

  @Input() recipe!: Recipe

  public details() {
    const userId = this._activatedRoute.snapshot.paramMap.get('userId');
    if (userId) {
      this._router.navigate([`${userId}/recipeDetail/${this.recipe.recipeId}`])
    } else { 
      this.toast()
    }
  }

  show(typeIcon = TYPE.INFO) {
    Swal.fire({
      title: 'Error!',
      text: 'Do you want to continue',
      icon: typeIcon,
      confirmButtonText: 'Cool'
    });
  }

  toast(typeIcon = TYPE.INFO, timerProgressBar: boolean = false) {
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      icon: typeIcon,
      timerProgressBar,
      timer: 3000,
      title: 'You must sign up first'
    });
  }
}
