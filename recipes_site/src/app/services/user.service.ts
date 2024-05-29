import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { User } from '../models/user.model';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'https://localhost:7042/api/user'
  constructor(private _http: HttpClient) { }

  public getUserList(): Observable<User[]> {
    return this._http.get<User[]>(this.baseUrl)
  }

  public getUserById(id: string): Observable<User> {
    return this._http.get<User>(`${this.baseUrl}/${id}`)
  }

  public getUserByName(name: string): Observable<any> {
    return this._http.post<any>(`${this.baseUrl}/name`, name)
  }

  public addUser(value: User): Observable<User> {
    return this._http.post<User>(this.baseUrl, value)
  }

  public updateUser(value: User): Observable<User> {
    return this._http.put<User>(this.baseUrl, value)
  }

  public deleteUser(id: string): Observable<User> {
    return this._http.delete<User>(`${this.baseUrl}/${id}`)
  }
}
