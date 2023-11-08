import { HttpErrorResponse, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';
import { RegisterModel } from 'src/app/models/register-model';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy{
  constructor(private userService: UserService, private router: Router) {}

  userRolesSubscriper?: Subscription;

  roles: {id: string, name:string}[] = [];

  ngOnInit(): void {
    this.userRolesSubscriper = this.userService.GetRoles().subscribe({
      next: (response) => {
        Object.assign(this.roles, response);
      },

      error: (err) => {
        console.log(err);
      }
    });
  }


    registerForm = new FormGroup({
        FullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        UserName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        Email: new FormControl('', [Validators.required, Validators.email]),
        Password: new FormControl('', [Validators.required]),
        Role: new FormControl('',[Validators.required]),
    });

    get fullNameInput(){
      return this.registerForm.controls.FullName;
    }

    get userNameInput(){
      return this.registerForm.controls.UserName;
    }

    get emailInput(){
      return this.registerForm.controls.Email;
    }

    get passwordInput(){
      return this.registerForm.controls.Password;
    }

    get rolenput(){
      return this.registerForm.controls.Role;
    }

    registerUserSubscriper?: Subscription;

    errors?: string;

    register(e: Event){
        e.preventDefault();

        if(this.registerForm.valid){
            let registerModel: RegisterModel = this.registerForm.value as RegisterModel;

            this.registerUserSubscriper = this.userService.Register(registerModel).subscribe({
                next: (response) => {
                    this.router.navigate(['']);
                },

                error: (err: HttpErrorResponse) => {
                    this.errors = err.error;
                }
            })
        }
    }

    ngOnDestroy(): void {
        this.registerUserSubscriper?.unsubscribe();
        this.userRolesSubscriper?.unsubscribe();
    }
}
