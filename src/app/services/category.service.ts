import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
baseUrl='https://localhost:7042/api/category'
  constructor(private _http:HttpClient) { }

  public getCategoryList(): Observable<Category[]>{
    return this._http.get<Category[]>(this.baseUrl)
  }

  public getCategoryById(id:string):Observable<Category>{
    return this._http.get<Category>(`${this.baseUrl}/${id}`)
  }

  public addCategory(value:Category):Observable<Category>{
    return this._http.post<Category>(this.baseUrl,value)
  }

  public updateCategory(value:Category):Observable<Category>{
    return this._http.put<Category>(this.baseUrl,value)
  }

  public deleteCategory(id:string):Observable<Category>{
    return this._http.delete<Category>(`${this.baseUrl}/${id}`)
  }


}
