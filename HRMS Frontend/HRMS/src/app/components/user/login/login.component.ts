import { HttpErrorResponse } from "@angular/common/http";
import { LoginModel } from "../../../models/login-model";
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Subscription } from 'rxjs';
import { AuthenticationModel } from "src/app/models/authentication-model";
import { UserService } from 'src/app/services/user-service.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy{
    constructor(private userService: UserService, private router: Router) {}


    loginForm = new FormGroup({
        UserName: new FormControl('', [Validators.required]),
        Password: new FormControl('', [Validators.required])
    });

    get userName(){
        return this.loginForm.controls.UserName;
    }

    get password(){
        return this.loginForm.controls.Password;
    }

    loginUserSubscription?: Subscription;

    message?: string;


    login(e: Event): void{
        e.preventDefault();
        
        if(this.loginForm.valid){
            let loginModel: LoginModel = this.loginForm.value as LoginModel;
            this.loginUserSubscription = this.userService.Login(loginModel).subscribe({
                next: (response: AuthenticationModel) =>{
                    if(response.isAuthenticated){
                        const token = response.token;
                        localStorage.setItem("jwt", token);

                        this.router.navigate(['']);
                    }

                    this.message = response.message;
                },

                error: (err: HttpErrorResponse) =>{
                    let errorObj = {
                        Status: err.status,
                        Header: err.headers,
                        Name: err.name,
                        Message: err.message
                    }
                    console.log(err);
                }
            });
        }
    }

    ngOnDestroy(): void {
        this.loginUserSubscription?.unsubscribe();
    }
}
