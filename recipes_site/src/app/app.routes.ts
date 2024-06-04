import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AllRecipeComponent } from './all-recipe/all-recipe.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register/:userNameToPass', component: RegisterComponent },
    { path: 'register', component: RegisterComponent },
    { path: ':userId/allRecipes', component: AllRecipeComponent },
    { path: 'allRecipes', component: AllRecipeComponent },
    { path: ':userId/recipeDetail/:recipe', component: RecipeDetailsComponent },
    { path: ':userId/editRecipe/:recipe', component: EditRecipeComponent },
    { path: ':userId/addRecipe', component: AddRecipeComponent }
];
