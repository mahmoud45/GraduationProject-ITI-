import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    constructor(private jwtHelper: JwtHelperService, private authGuard: AuthGuardService, private router:Router) {}

    isAuthenticatd(): boolean{
        const token = localStorage.getItem("jwt");
        if(token !== "null" && !this.jwtHelper.isTokenExpired(token)){
            return true;
        }

        return false;
    }

    isHRAdmin(){
      const token = localStorage.getItem("jwt") ?? "";
      return this.authGuard.hasRole(token, ["HumanResource"]);
    }

    hasPermissions(permissions: string[]){
      const decodedToken = this.jwtHelper.decodeToken(localStorage.getItem("jwt") ?? "");

      for(let key in decodedToken){
        if(key.includes("permission")){

          return permissions.some(permission => {
              if(typeof decodedToken[key] === "object"){
                return decodedToken[key].some((_permission: string) => _permission.includes(permission))
              }else{
                return decodedToken[key].includes(permission);
              }
            });
        }
      }
      
      return false;
    }

    logout(){
        localStorage.removeItem("jwt");

        return this.router.navigate(['login']);
    }
}
