import { Component } from '@angular/core';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { TYPE } from '../add-recipe/values.constants';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  constructor(private _router: Router, private _activatedRoute: ActivatedRoute) { }

  logIn() {
    this._router.navigate([`login`])
  }

  register() {
    this._router.navigate([`register`])
  }

  allRecipes() {
    const userId = this._activatedRoute.snapshot.paramMap.get('userId');
    if (userId) {
      this._router.navigate([`${userId}/allRecipes`])
    } else {
      this._router.navigate([`/allRecipes`])
    }
  }

  addRecipes() {
    const userId = this._activatedRoute.snapshot.paramMap.get('userId');
    console.log(userId)
    if (userId) {
      this._router.navigate([`${userId}/addRecipes`])
    } else {
      this.toast()
    }

  }

  logOut() {

  }

  onTabChanged(event: MatTabChangeEvent) {
    const selectedTab = event.tab.textLabel;

    if (selectedTab === 'Log in') {
      this.logIn();
    } else if (selectedTab === 'Register') {
      this.register();
    }
    else if (selectedTab === 'All recipes') {
      this.allRecipes();
    }
    else if (selectedTab === 'Add recipe') {
      this.addRecipes();
    }
    else if (selectedTab === 'Log out') {
      this.logOut();
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
      timer: 5000,
      title: 'You must sign up first'
    });
  }
}
