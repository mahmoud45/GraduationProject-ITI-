import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEmployee } from '../models/iemployee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeservicesService {
  baseUrl :string ='https://localhost:7073/api/Employee' ;
  constructor(private http :HttpClient) { }

  GetAllEmployees() :Observable<IEmployee[]>
  {
   return this.http.get<IEmployee[]>(this.baseUrl)
  }

  AddEmployee(AddEmployee:IEmployee)
  {
   return this.http.post('https://localhost:7073/api/Employee',AddEmployee)
  }
  deleteEmployee(employeeid:number)
  {
   return this.http.delete('https://localhost:7073/api/Employee/'+employeeid)
  }

 
}
