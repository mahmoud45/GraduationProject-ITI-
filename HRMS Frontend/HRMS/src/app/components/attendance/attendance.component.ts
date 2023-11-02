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
  attendanceForm=new FormGroup({
    arrivalTime: new FormControl("",Validators.required),
    departureTime: new FormControl("",Validators.required),
    attendanceDate: new FormControl("",Validators.required)
  });

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
  
  getDataSubmit(e:Event){
    e.preventDefault()
    if(this.SearchForm.invalid)
      return;
    console.log("hello");
    
    this.getData()
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


  editAttendance(DTOModel:IAttendanceModel){
  }
  deleteAttendance(attendanceID:any){
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
  setArrivalTime():string|null{
    return this.AttendanceModel.id==0?null:this.AttendanceModel.arrivalTime.toTimeString();
  }
  setDepartureTime():string|null{
    return this.AttendanceModel.id==0?null:this.AttendanceModel.departureTime.toTimeString();
  }
  setAttendanceDate():Date|null{
    return this.AttendanceModel.id==0?null:this.AttendanceModel.attendaceDate;
  }
  attendanceModelFormFunction(e:Event){

    e.preventDefault()

    if(this.attendanceForm.invalid)
      return;

    this.AttendanceModel.arrivalTime = this.convertTimeToDate(this.attendanceForm.get('arrivalTime')?.value); 
    this.AttendanceModel.departureTime = this.convertTimeToDate(this.attendanceForm.get('departureTime')?.value)
    let date:any = this.attendanceForm.get('attendanceDate')?.value;
    this.AttendanceModel.attendaceDate = new Date(date);

    console.log(this.AttendanceModel);
    this.AttendanceModel.id=null;
    if (this.AttendanceModel.dept_Name === "") {
      this.api.addAttendance(this.AttendanceModel).subscribe({
        next:()=>{},
        error:()=>{
          console.log("post error");
        },
        complete:()=>{
        }
      });
    }
  }
  convertTimeToDate(time:any):Date{
    let date:Date=new Date();
    date.setHours(parseInt(time?.split(":")[0]));
    date.setMinutes(parseInt(time.split(":")[1]));
    return date;
  }
}
