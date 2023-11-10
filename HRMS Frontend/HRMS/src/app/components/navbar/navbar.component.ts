import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    constructor(private jwtHelper: JwtHelperService, private router:Router) {}

    isAuthenticatd(): boolean{
        const token = localStorage.getItem("jwt");
        if(token !== "null" && !this.jwtHelper.isTokenExpired(token)){
            return true;
        }

        return false;
    }

    logout(){
        localStorage.removeItem("jwt");

        return this.router.navigate(['login']);
    }
}
