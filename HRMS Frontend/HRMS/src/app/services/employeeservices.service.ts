import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEmployee } from '../models/iemployee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeservicesService 
{
  constructor(public http :HttpClient) { }

  GetAllEmployees():Observable<any>
  {
   return this.http.get("https://localhost:44324/api/Employee")
  }

  GetEmployee(id:number):any
  {
   return this.http.get("https://localhost:7073/api/Employee/"+id)
  }

  AddEmployee(AddEmployee:IEmployee):any
  {
   return this.http.post("https://localhost:7073/api/Employee",AddEmployee)
  }
  deleteEmployee(employeeid:number)
  {
   return this.http.delete('https://localhost:7073/api/Employee/'+employeeid)
  }
  editEmployee(employee:IEmployee)
  {
   return this.http.put('https://localhost:7073/api/Employee/'+employee.id,employee)
  }
}
