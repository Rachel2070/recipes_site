import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatDividerModule, MatIconModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private _userService: UserService) { }

  public propertiesArr = [ "userName", "userAddress", "userEmail", "userPassword"]

  public registerForm: FormGroup = new FormGroup({
    "userName": new FormControl("", Validators.required),
    "userAddress": new FormControl("", Validators.required),
    "userEmail": new FormControl("", Validators.required),
    "userPassword": new FormControl("", Validators.required)
  });

  public signUp() {
    let userData = this.registerForm.value;
    this._userService.addUser(userData).subscribe({
      next: (res) => {
        console.log(res, "succsess")
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
