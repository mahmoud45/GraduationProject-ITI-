import { EmployeeservicesService } from './../../../../services/employeeservices.service';
import { Component, OnInit } from '@angular/core';
import { IEmployee } from 'src/app/models/iemployee';


@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.css']
})


export class AddEmpComponent  {
  
  dates:{birthDate:string,hireDate:string,
         arrivalTime: string,leaveTime:string}
         =
         {birthDate:"",hireDate:"",
          arrivalTime:"",leaveTime:""
    };
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
    nationalId:0,
    salary:0,
    birthDate:new Date(),
    hireDate:new Date(),
    arrivalTime:new Date(),
    leaveTime:new Date(),
  }

}
onsubmitform(e:Event)
  {
    e.preventDefault();

    this.modelemployee.birthDate=new Date(this.dates.birthDate)
    this.modelemployee.hireDate=new Date(this.dates.hireDate)

    this.modelemployee.arrivalTime=new Date(this.convertTimeToDate(this.dates.arrivalTime))
    this.modelemployee.leaveTime=new Date(this.convertTimeToDate(this.dates.leaveTime))
    
    console.log(this.modelemployee);


    this.Employeservices.AddEmployee(this.modelemployee).subscribe({
      next:()=>{},
      error:()=>{
        window.alert("error in adding")
      },
      complete:()=>{
        window.alert("successfully added")
      }
    });

  }

  convertTimeToDate(time:any):Date{
    let date:Date=new Date();
    date.setUTCHours(parseInt(time?.split(":")[0]));
    date.setUTCMinutes(parseInt(time.split(":")[1]));
    return date;
  }

}










