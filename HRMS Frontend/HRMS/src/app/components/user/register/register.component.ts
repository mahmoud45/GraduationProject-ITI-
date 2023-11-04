import { HttpErrorResponse, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
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
export class RegisterComponent implements OnDestroy{
    constructor(private userService: UserService, private router: Router) {}


    registerForm = new FormGroup({
        FullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        UserName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        Email: new FormControl('', [Validators.required, Validators.email]),
        Password: new FormControl('', [Validators.required]),
        Role: new FormControl('',[Validators.required]),
    });

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


    testCORS(){
        this.userService.TestCORS().subscribe({
            next: (response) => {
                console.log(response)
            },

            error: (err) => {
                console.log("error");
            }
        })
    }

    ngOnDestroy(): void {
        this.registerUserSubscriper?.unsubscribe();
    }
}
