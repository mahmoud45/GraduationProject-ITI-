import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDepartment } from '../models/IDepartment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(public http :HttpClient) { }

  GetAllDepartments():any
  {
   return this.http.get("https://localhost:7073/api/Department")
  }

  GetDepartment(id:number):any
  {
   return this.http.get("https://localhost:7073/api/Department/"+id)
  }

  AddDepartment(department:IDepartment):any
  {
   return this.http.post("https://localhost:7073/api/Department",department)
  }
  deleteDepartment(id:number):any
  {
   return this.http.delete("https://localhost:7073/api/Department/"+id)
  }
}
