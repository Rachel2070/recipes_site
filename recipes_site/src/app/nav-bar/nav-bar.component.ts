import { Component } from '@angular/core';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import Swal from 'sweetalert2';
import { TYPE } from '../add-recipe/values.constants';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  selectedTabIndex: number = 0;

  constructor(private _router: Router, private _activatedRoute: ActivatedRoute) {
    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const selectedRoute = this._router.url;
      this.updateSelectedTabIndex(selectedRoute);
    });
  }

  updateSelectedTabIndex(selectedRoute: string) {
    switch (true) {
      case selectedRoute.includes('login'):
        this.selectedTabIndex = 0;
        break;
      case selectedRoute.includes('register'):
        this.selectedTabIndex = 1;
        break;
      case selectedRoute.includes('allRecipes'):
        this.selectedTabIndex = 2;
        break;
      case selectedRoute.includes('addRecipe'):
        this.selectedTabIndex = 3;
        break;
      default:
        this.selectedTabIndex = 2; 
        break;
    }
  }

  logIn() {
    const user = sessionStorage?.getItem("currentUser");
    if (user) {
      this.toast2();
    } else {
      this._router.navigate([`login`]);
    }
  }

  register() {
    const user = sessionStorage?.getItem("currentUser");
    if (user) {
      this.toast2();
    } else {
      this._router.navigate([`register`]);
    }
  }

  allRecipes() {
    const user = sessionStorage?.getItem("currentUser");
    if (user) {
      const currentUser = JSON.parse(user);
      const userId = currentUser?.userId || currentUser?.user?.userId;
      this._router.navigate([`${userId}/allRecipes`]);
    } else {
      this._router.navigate([`/allRecipes`]);
    }
  }

  addRecipe() {
    const user = sessionStorage?.getItem("currentUser");
    if (user) {
      const currentUser = JSON.parse(user);
      const userId = currentUser?.userId || currentUser?.user?.userId;
      this._router.navigate([`${userId}/addRecipe`]);
    } else {
      this.toast();
    }
  }

  logOut() {
    const user = sessionStorage?.getItem("currentUser");
    if (user) {
      sessionStorage.removeItem("currentUser");
      this.toast3();
      this._router.navigate([`allRecipes`]);
    } else {
      this.toast();
    }
  }

  onTabChanged(event: MatTabChangeEvent) {
    const selectedTab = event.tab.textLabel;

    if (selectedTab === 'Log in') {
      this.logIn();
    } else if (selectedTab === 'Register') {
      this.register();
    } else if (selectedTab === 'All recipes') {
      this.allRecipes();
    } else if (selectedTab === 'Add recipe') {
      this.addRecipe();
    } else if (selectedTab === 'Log out') {
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
      timer: 3000,
      title: 'You need to sign up first'
    });
  }

  toast2(typeIcon = TYPE.WARNING, timerProgressBar: boolean = false) {
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      icon: typeIcon,
      timerProgressBar,
      timer: 3000,
      title: 'You are already registered'
    });
  }

  toast3(typeIcon = TYPE.SUCCESS, timerProgressBar: boolean = false) {
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      icon: typeIcon,
      timerProgressBar,
      timer: 3000,
      title: 'goodbye see you soon'
    });
  }
}