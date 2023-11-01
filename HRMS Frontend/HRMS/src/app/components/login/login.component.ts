import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(){}

  loginForm = new FormGroup({
    username: new FormControl("",[Validators.required,Validators.pattern("^([a-zA-Z])([a-zA-Z0-9]{4,10})")]),
    password: new FormControl("",[Validators.required,Validators.minLength(10)])
  })

  get usernameFunc():boolean{
    return this.loginForm.controls['username'].status == 'INVALID';
  }
  get passwordFunc():boolean{
    return this.loginForm.controls['password'].status == 'INVALID';
  }
}
