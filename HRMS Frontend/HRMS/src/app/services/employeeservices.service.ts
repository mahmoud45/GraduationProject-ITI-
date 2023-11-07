import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEmployee } from '../models/iemployee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeservicesService 
{
  constructor(public http :HttpClient) { }

  GetAllEmployees():any
  {
   return this.http.get("https://localhost:7073/api/Employee")
  }

  AddEmployee(AddEmployee:IEmployee):any
  {
   return this.http.post("https://localhost:7073/api/Employee",AddEmployee)
  }
  deleteEmployee(employeeid:number)
  {
   return this.http.delete('https://localhost:7073/api/Employee/'+employeeid)
  }
}
