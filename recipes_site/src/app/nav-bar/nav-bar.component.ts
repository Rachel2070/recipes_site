import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  constructor(private _router: Router, private _activatedRoute: ActivatedRoute){}
  logIn(){
    this._router.navigate([`login`])
    console.log("lplpp")
  }
  Register(){
    this._router.navigate([`register`])
  }

  allRecipes(){
    const userId = this._activatedRoute.snapshot.paramMap.get('userId');
    if (userId) {
      this._router.navigate([`${userId}/allRecipes`])
    } else { 
      this._router.navigate([`/allRecipes`])
    }
    
  }

  logOut(){

  }
}
