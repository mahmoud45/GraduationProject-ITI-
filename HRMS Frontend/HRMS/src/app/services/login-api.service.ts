import { IAttendanceModel } from './../models/iattendance-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginAPIService {

  constructor(public http: HttpClient) { }

  getAllAttendance():any{
    return this.http.get("https://localhost:7073/api/Attendance")
  }
  getAllAttendanceByName(emp_name:string):any{
    return this.http.get("https://localhost:7073/search/"+emp_name)
  }
  addAttendance(DTOModel:IAttendanceModel):any{
    return this.http.post("",DTOModel)
  }
  editAttendance(DTOModel:IAttendanceModel):any{
    return this.http.put("",DTOModel)
  }
  deleteAttendance(id:number):any{
    return this.http.delete("https://localhost:7073/api/Attendance?id="+id)
  }
}
