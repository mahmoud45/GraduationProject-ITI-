<<<<<<< HEAD
import { GeneralSettingComponent } from './components/general-setting/general-setting.component';
=======

>>>>>>> 487cba80bc42cb2f885312b522dec72fdb68725a
import { HttpClientModule } from '@angular/common/http';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HomeComponent } from './components/home/home.component';
import { JwtModule} from '@auth0/angular-jwt';
import { RegisterComponent } from './components/user/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SalaryComponent } from './components/salary/salary.component';
import { VacationsComponent } from './components/vacations/vacations.component';
import { RoleService } from './services/role.service';
import { RolesComponent } from './components/roles/roles.component';
import { AddEmpComponent } from './components/employee/AddEmployee/add-emp/add-emp.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/user/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { DepartmentComponent } from './components/department/department.component';
import { DepartmentFormComponent } from './components/department/department-form/department-form.component';


export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({

declarations:
[
    AppComponent,
    LoginComponent,
    AttendanceComponent,
    HomeComponent,
    RegisterComponent,
    NavbarComponent,
    SalaryComponent,
    EmployeeComponent,
    AddEmpComponent,
<<<<<<< HEAD
<<<<<<< HEAD
    DepartmentComponent,
    DepartmentFormComponent,
=======
    GeneralSettingComponent
>>>>>>> khaled
=======

    DepartmentComponent,
    DepartmentFormComponent,
    VacationsComponent,
     RolesComponent,
>>>>>>> 487cba80bc42cb2f885312b522dec72fdb68725a
],  

imports: [
<<<<<<< HEAD
  BrowserModule,
  AppRoutingModule,
  ReactiveFormsModule,
  HttpClientModule,
  FormsModule,
  MatSlideToggleModule,
  JwtModule.forRoot({
      config: {
          tokenGetter: tokenGetter,
          allowedDomains: ['*'],
          disallowedRoutes: [],
      },
  }),
],
providers: [],
bootstrap: [AppComponent],
=======
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        MatSlideToggleModule,
        FormsModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                allowedDomains: ['*'],
                disallowedRoutes: [],
            },
        }),
    ],

providers: [RoleService],
bootstrap: [AppComponent,RolesComponent],

>>>>>>> 487cba80bc42cb2f885312b522dec72fdb68725a
})
export class AppModule { }



