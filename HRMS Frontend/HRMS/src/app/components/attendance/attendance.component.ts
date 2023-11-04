import { IAttendanceModel } from './../../models/iattendance-model';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginAPIService } from 'src/app/services/login-api.service';
import { emptyForm } from 'src/app/validators/AttendanceForm_Empty';
import { checkDates } from 'src/app/validators/AttendanceForm_checkDates';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent  {

  FormValidationState:boolean=false;
  SearchForm: FormGroup;

  DataModel:IAttendanceModel[]=[];
  AttendanceModel:IAttendanceModel=this.initializeAttendanceModel();

  constructor(private api : LoginAPIService,private fb: FormBuilder){
    this.SearchForm = this.fb.group(({
      name: new FormControl(""),
      dateF: new FormControl(""),
      dateT: new FormControl("")
    }), {
      validators: [checkDates(),emptyForm()]
    });
  }
  
  getData(){
    if(this.SearchForm.invalid){
      this.FormValidationState = true;
      return;
    }
    this.FormValidationState=false;

    if(this.SearchForm.get("name")?.value){
      this.api.getAllAttendanceByName(this.SearchForm.get("name")?.value).subscribe({
            next:(response:any)=>{
              this.DataModel = response;        
            },
            error:()=>{},
            complete:()=>{
              if(this.SearchForm.get("dateF")?.value&&this.SearchForm.get("dateT")?.value){
                this.filterDataByDate()
              } 
            }
          });
    }
    else{
      this.api.getAllAttendance().subscribe({
        next:(response:any)=>{
          this.DataModel = response;                  
        },
        error:()=>{},
        complete:()=>{
          if(this.SearchForm.get("dateF")?.value&&this.SearchForm.get("dateT")?.value){
            this.filterDataByDate()
          }
        }
      });
    }

  }
  // validateForm(){
  //   if(!this.SearchForm.get("name")?.value &&
  //      !this.SearchForm.get("dateF")?.value || !this.SearchForm.get("dateT")?.value)
  //     {
  //       this.FormValidationState=true; 
  //       return;
  //     }
  //     this.FormValidationState=false; 
  // }  
  filterDataByDate(){
    const data:IAttendanceModel[] = this.DataModel;
    this.DataModel=[];
    for (const key of data) {
      if (new Date(key.attendaceDate).toISOString().split('T')[0]
      >=new Date(this.SearchForm.get("dateF")?.value).toISOString().split('T')[0]
      && new Date(key.attendaceDate).toISOString().split('T')[0]
      <=new Date(this.SearchForm.get("dateT")?.value).toISOString().split('T')[0]) 
      {
        this.DataModel.push(key)
      }
    } 
  }
  addAttendance(emp_ID:number,emp_name:string){
    this.AttendanceModel=this.initializeAttendanceModel();

    this.AttendanceModel.emp_ID=emp_ID;
    this.AttendanceModel.emp_Name=emp_name;
  }


  editAttendance(DTOModel:IAttendanceModel){}
  deleteAttendance(attendanceID:number)
  {
    const userConfirmed = window.confirm('Do you really want to delete this?');

    if (userConfirmed) {
      this.api.deleteAttendance(attendanceID)
      this.api.deleteAttendance(attendanceID).subscribe({
        next:(response:any)=>{       
        },
        error:()=>{
          window.alert("Can't delete since error is existed");
        },
        complete:()=>{
          window.alert("the attendance is deleted successfully");
          this.getData()
        }
      });
    } 
  }

  initializeAttendanceModel():IAttendanceModel{
    return {
      id: 0,
      emp_ID: 0,
      emp_Name: "",
      dept_Name: "",
      arrivalTime: new Date(),
      departureTime: new Date(),
      attendaceDate: new Date()
    }
  }
  setArrivalTime():Date|null{
    return this.AttendanceModel.id==0?null:this.AttendanceModel.arrivalTime;
  }
  setDepartureTime():Date|null{
    return this.AttendanceModel.id==0?null:this.AttendanceModel.departureTime;
  }
  setAttendanceDate():Date|null{
    return this.AttendanceModel.id==0?null:this.AttendanceModel.attendaceDate;
  }
}