import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  host: {
    '[attr.ngSkipHydration]': 'true'
  }
})
export class LoginComponent {
  constructor(private _userService: UserService) { }

  public loginForm: FormGroup = new FormGroup({
    "userName": new FormControl("", Validators.required),
    "password": new FormControl("", Validators.required)
  });

  public tryLogin() {
    let userData = this.loginForm.value;
    this._userService.getUserByName(userData.userName).subscribe({
      next: (res) => {
        if (!res) {
          console.log("hi")
        }
        else if (res && res.userPassword == userData.password) {
          console.log("by")
        }
      },
      error: (err) => {
        console.error(err);
      }
    })

  }
}