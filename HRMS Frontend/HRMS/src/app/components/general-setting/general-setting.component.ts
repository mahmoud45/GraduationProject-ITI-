import { WeekDay, getLocaleFirstDayOfWeek } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { generalSettingData } from 'src/app/models/iGeneralSetting-model';
import { GeneralSettingService } from 'src/app/services/general-setting.service';
import { emptyForm } from 'src/app/validators/AttendanceForm_Empty';
import { EmployeeservicesService } from 'src/app/services/employeeservices.service';
import { IEmployee } from 'src/app/models/iemployee';
import { min } from 'rxjs';
import { uniqueValueValidator } from 'src/app/validators/GeneralSettings_UniqueVacationDay';

@Component({
  selector: 'app-general-setting',
  templateUrl: './general-setting.component.html',
  styleUrls: ['./general-setting.component.css']
})
export class GeneralSettingComponent implements OnInit {
  action:boolean=true;
  employees:IEmployee[]=[];
  employeeGeneralSettingData:any=null;
  buttonClicked:string="";
  generalData:generalSettingData = {Id:0,Bonus:1,Discount:1,EmployeeID:0,VacationDay1:"",VacationDay2:""};
  generalDataForm=new FormGroup({
    id:new FormControl(),
    bonusControl:new FormControl(this.generalData.Bonus,[Validators.required,Validators.min(1)]),
    discountControl:new FormControl(this.generalData.Discount,[Validators.required,Validators.min(1)]),
    vacationDay1Control:new FormControl(),
    vacationDay2Control:new FormControl('',[uniqueValueValidator]),
    empID:new FormControl()});
  days:string[] = ["Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"]
  get getBonus(){return this.generalDataForm.controls['bonusControl']}
  get getDiscount(){return this.generalDataForm.controls['discountControl']}
  get getVDay1(){return this.generalDataForm.controls['vacationDay1Control']}
  get getVDay2(){return this.generalDataForm.controls['vacationDay2Control']}

  constructor(public service:GeneralSettingService,public empService:EmployeeservicesService) {
    this.generalDataForm.controls['empID'].setValue(0);
   }

  ngOnInit(): void {
    this.empService.GetAllEmployees().subscribe({
      next : (value)=>{
        if(value!=null)
        this.employees=value;
      },
      error :(err)=> {       
      },
      complete :()=>{
        console.log(this.employees);
      }
    })
    this.service.getGeneralSettings().subscribe({
      next : (response)=>{
        if(response!=null){
          this.mappingData(response);
        }
      },
      error : (err)=>{
        alert(err.error);      
      },
      complete: ()=>{    
        console.log(this.generalDataForm.controls['id'].value);
        console.log(this.generalDataForm.controls['bonusControl'].value);
        console.log(this.generalDataForm.controls['discountControl'].value);
        console.log(this.generalDataForm.controls['vacationDay1Control'].value);
        console.log(this.generalDataForm.controls['vacationDay2Control'].value);    
        this.action=false;    
      }
    });   
  }

  setButtonClicked(buttonIdentifier: string) {
    this.buttonClicked = buttonIdentifier;
  }

  formOperation(e:Event){
    e.preventDefault();
    if(this.generalDataForm.valid && this.getVDay1.value!=null && this.getVDay2.value!=null && this.getVDay1.value!=this.getVDay2.value){
      this.generalData = { 
        Id:this.generalDataForm.controls['id'].value ,
        Bonus :this.generalDataForm.controls['bonusControl'].value,
        Discount :this.generalDataForm.controls['discountControl'].value,
        VacationDay1:this.generalDataForm.controls['vacationDay1Control'].value,
        VacationDay2:this.generalDataForm.controls['vacationDay2Control'].value,
        EmployeeID:this.generalDataForm.controls['empID'].value
      }
      console.log(this.generalData);
    
    if(this.buttonClicked == "save"){
      this.service.createGeneralSettings(this.generalData).subscribe({
        next:(value)=> {
          if (value) {
          alert("Successfully saved");
        }},
        error:(err)=> {
          alert(`${err.error.text}`);       
          this.action=true;
        },
        complete:()=> {
          this.action=true;
        },
      });
    }else{
     this.service.editGeneralSettings(this.generalData)
      .subscribe({
        next : (value)=>{
          alert("Updated Successfully");
        },
        error : (err)=>{
          alert(`${err.error}`);
          this.action=true;
        },
        complete : ()=>{
          this.action=true;
        }
      });
      
    }
    this.generalDataForm.controls['bonusControl'].setValue(null);
    this.generalDataForm.controls['discountControl'].setValue(null);
    this.generalDataForm.controls['vacationDay1Control'].setValue(null);
    this.generalDataForm.controls['vacationDay2Control'].setValue(null);
  }
  alert('Enter Valid Data')
  } 
  employeeSetting(){
    console.log(this.getVDay1.value);
    console.log(this.generalDataForm.controls['empID'].value);
    const id = this.generalDataForm.controls['empID'].value;
    if(id != 0 && id != null)
    this.service.getGeneralSettingByEmpID(id).subscribe({
      next :(value)=>{
        if(value != null){
          this.mappingData(value);
        }
  },
  error : (err)=>{
    alert(`Error Occured : ${err.error}`);
    this.action=true;
  },
  complete:()=>{
    this.action=false
  }
}) 
  }
  mappingData(response:any){
    this.generalDataForm.controls['id'].setValue(response.id)
    this.generalDataForm.controls['bonusControl'].setValue(response.bonus)
    this.generalDataForm.controls['discountControl'].setValue(response.discount)
    this.generalDataForm.controls['vacationDay1Control'].setValue(response.vacationDay1)
    this.generalDataForm.controls['vacationDay2Control'].setValue(response.vacationDay2)
  }
}
