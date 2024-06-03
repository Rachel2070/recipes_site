import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatDividerModule, MatIconModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private _router: Router, private _activatedRoute: ActivatedRoute, private _userService: UserService) { } 

  public propertiesArr = ["userName", "userAddress", "userEmail", "userPassword"]
  public userName = this._activatedRoute.snapshot.paramMap.get('userNameToPass') ;


  public registerForm: FormGroup = new FormGroup({
    "userName": new FormControl( this.userName , Validators.required),
    "userAddress": new FormControl("", Validators.required),
    "userEmail": new FormControl("", Validators.required),
    "userPassword": new FormControl("", Validators.required)
  });

  public signUp() {
    let userData = this.registerForm.value;
    this._userService.addUser(userData).subscribe({
      next: (res) => {
        if (res == null) {
          alert("this user already registed...")
        }
        else {
          this._router.navigate([`${res.userId}/allRecipes`])
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
