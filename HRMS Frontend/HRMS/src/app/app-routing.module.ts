import { DepartmentFormComponent } from './components/department/department-form/department-form.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmpComponent } from './components/employee/AddEmployee/add-emp/add-emp.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { AuthGuard } from './services/auth-guard.service';
import { AttendanceComponent } from './components/attendance/attendance.component';

import { VacationsComponent } from './components/vacations/vacations.component';

import { DepartmentComponent } from './components/department/department.component';


const routes: Routes = [
    {path: '', component: HomeComponent},
    {path:'employee',component:EmployeeComponent},
    {path:'employee/:id',component:AddEmpComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent, data: {allowedRoles: ["HumanResource"], allowedPermissions: ["generalsetting.View"]}, canActivate: [AuthGuard]},
    {path:'attendance',component: AttendanceComponent},

    {path:'vacations',component: VacationsComponent},


    {path:'departmentForm',component: DepartmentFormComponent},
    {path:'department',component: DepartmentComponent},
];



@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
