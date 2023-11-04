import { RouterModule } from '@angular/router';
import { EmployeeservicesService } from './../../services/employeeservices.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IEmployee } from 'src/app/models/iemployee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employeeForm :FormGroup | undefined;
  selectedEmployee: IEmployee | null = null;
  employees: IEmployee[] = []; 
  Employee:any;
  constructor(private _Employeeservices:EmployeeservicesService) {}
  ngOnInit() : void {
      this._Employeeservices.GetAllEmployees().subscribe({
        next: (response)=>{
          this.employees=response;
        
         
        },
        error:()=>{},
        complete:()=>{},
      });  
    };
  deleteEmployee(EmployeeId:number)
  {
    const userConfirmed = window.confirm('Do you really want to delete this?');

    if (userConfirmed)
     {
this._Employeeservices.deleteEmployee(EmployeeId).subscribe(
{
  next: ()=>{
    this.employees=this.employees.filter(
      (Employee:any)=>Employee.id!=EmployeeId);
  },

})};
};
}
 
  

