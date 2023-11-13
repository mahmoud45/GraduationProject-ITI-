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
import { SalaryComponent } from './components/salary/salary.component';
import { GeneralSettingComponent } from './components/general-setting/general-setting.component';
import { RolesComponent } from './components/roles/roles.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';

const routes: Routes = [
    {path:'', redirectTo: 'home', pathMatch: 'full'},
    {path:'home', component: HomeComponent},
    {path:'employee',component:EmployeeComponent},
    {path:'employee/:id',component:AddEmpComponent},
    {path:'login', component: LoginComponent},
    {path:'register', component: RegisterComponent, data: {allowedRoles: ['HumanResource']}, canActivate: [AuthGuard]},
    {path:'attendance',component: AttendanceComponent},
    {path:'vacations',component: VacationsComponent},
    {path:'departmentForm',component: DepartmentFormComponent},
    {path:'department',component: DepartmentComponent},
    {path:'salary',component: SalaryComponent},
    {path:'GeneralSettings',component:GeneralSettingComponent},
    {path:'roles',component:RolesComponent},
    {path: 'AccessDenied', component: AccessDeniedComponent},
    {path:'**',component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
