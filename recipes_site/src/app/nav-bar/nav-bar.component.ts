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
    const user = sessionStorage.getItem("currentUser");
    if (user) {
      this.toast2()
    }
    else {
      this._router.navigate([`login`])
    }
  }

  register() {
    const user = sessionStorage.getItem("currentUser");
    if (user) {
      this.toast2()
    }
    else {
      this._router.navigate([`register`])
    }
    
  }

  allRecipes() {
    const user = sessionStorage.getItem("currentUser");
    if (user) {
      const currentUser = JSON.parse(user);
      const userId = currentUser?.userId || currentUser?.user?.userId;
      this._router.navigate([`${userId}/allRecipes`]);
    } else {
      this._router.navigate([`/allRecipes`]);
    }
  }

  addRecipe() {
    const user = sessionStorage.getItem("currentUser");
    if (user) {
      const currentUser = JSON.parse(user);
      const userId = currentUser?.userId || currentUser?.user?.userId;
      this._router.navigate([`${userId}/addRecipe`])
    } else {
      this.toast()
    }
  }

  logOut() {
    const user = sessionStorage.getItem("currentUser");
    if (user) {
      sessionStorage.removeItem("currentUser");
      this.toast3()
      this._router.navigate([`allRecipes`])
    }
    else {
      this.toast()
    }
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
      this.addRecipe();
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
      title: 'You need to sign up first'
    });
  }

  toast2(typeIcon = TYPE.INFO, timerProgressBar: boolean = false) {
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      icon: typeIcon,
      timerProgressBar,
      timer: 5000,
      title: 'You are already registered'
    });
  }

  toast3(typeIcon = TYPE.INFO, timerProgressBar: boolean = false) {
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      icon: typeIcon,
      timerProgressBar,
      timer: 5000,
      title: 'goodbye see you soon'
    });
  }
}
