import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../services/user.service';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule , MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatDividerModule, MatIconModule, RegisterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  host: {
    '[attr.ngSkipHydration]': 'true'
  }
})
export class LoginComponent {
  constructor(private _userService: UserService) { }

  public isResistered = false

  public loginForm: FormGroup = new FormGroup({
    "userName": new FormControl("", Validators.required),
    "userPassword": new FormControl("", Validators.required)
  });

  public tryLogin() {
    let userData = this.loginForm.value;
    this._userService.getUserByName(userData).subscribe({
      next: (res) => {
        console.log("good")
      },
      error: (err) => {
        console.error(err);
        if(err.status == 400){
          alert("User name or password are invalid :(")
        }
        else if(err.status == 404){
          alert("This user does not exist. You are redirected to the registration page")
          this.isResistered=true
        }
      }
    })
  }
}