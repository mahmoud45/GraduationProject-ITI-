import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { AuthGuard } from './services/auth-guard.service';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { VacationsComponent } from './components/vacations/vacations.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent, data: {allowedRoles: ["HumanResource"]}, canActivate: [AuthGuard]},
    {path:'attendance',component: AttendanceComponent},
    {path:'vacations',component: VacationsComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
