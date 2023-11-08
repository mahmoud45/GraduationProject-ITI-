import { GeneralSettingComponent } from './components/general-setting/general-setting.component';
import { HttpClientModule } from '@angular/common/http';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HomeComponent } from './components/home/home.component';
import { JwtModule} from '@auth0/angular-jwt';
import { RegisterComponent } from './components/user/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SalaryComponent } from './components/salary/salary.component';
import { AddEmpComponent } from './components/employee/AddEmployee/add-emp/add-emp.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
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
    DepartmentComponent,
    DepartmentFormComponent,
=======
    GeneralSettingComponent
>>>>>>> khaled
],  
imports: [
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
})
export class AppModule { }



