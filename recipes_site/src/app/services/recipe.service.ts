import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  baseUrl='https://localhost:7042/api/recipe'
  constructor(private _http:HttpClient) { }

  public getRecipeList(): Observable<Recipe[]>{
    return this._http.get<Recipe[]>(this.baseUrl)
  }

  public getRecipeById(id:string):Observable<Recipe>{
    return this._http.get<Recipe>(`${this.baseUrl}/${id}`)
  }

  public addRecipe(value:Recipe):Observable<Recipe>{
    return this._http.post<Recipe>(this.baseUrl,value)
  }

  public updateRecipe(value:Recipe):Observable<Recipe>{
    return this._http.put<Recipe>(this.baseUrl,value)
  }

  public deleteRecipe(id:string):Observable<Recipe>{
    return this._http.delete<Recipe>(`${this.baseUrl}/${id}`)
  }

}
