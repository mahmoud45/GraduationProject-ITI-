import { EmployeeservicesService } from './../../../../services/employeeservices.service';
import { Component, OnInit } from '@angular/core';
import { IEmployee } from 'src/app/models/iemployee';
import { ActivatedRoute ,Router } from '@angular/router';


@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.css']
})


export class AddEmpComponent  {
  
  modelemployee :IEmployee ;

constructor( private Employeservices:EmployeeservicesService){
  this.modelemployee={
    id :0,
    firstName:'',
    lastName:'',
    address:'',
    phone:0,
    gender:'',
    nationality:'',
    birthDate:new Date(),
    nationalId:0,
    salary:0,
    hireDate:new Date(),
    arrivalTime:new Date(),
    leaveTime:new Date(),
  }

}
onsubmitform()
{
this.Employeservices.AddEmployee(this.modelemployee).subscribe({
  next:()=>{
 console.log('data add done ')
  }
})
  
  }
}










