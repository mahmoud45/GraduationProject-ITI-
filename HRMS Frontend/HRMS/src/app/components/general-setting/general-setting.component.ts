import { WeekDay, getLocaleFirstDayOfWeek } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { generalSettingData } from 'src/app/models/iGeneralSetting-model';
import { GeneralSettingService } from 'src/app/services/general-setting.service';
import { emptyForm } from 'src/app/validators/AttendanceForm_Empty';

@Component({
  selector: 'app-general-setting',
  templateUrl: './general-setting.component.html',
  styleUrls: ['./general-setting.component.css']
})
export class GeneralSettingComponent implements OnInit {
  action:boolean=true;
  employees:{name:string,value:number}[]=[
    {name:"ahmed",value:7},
    {name:"mohamed",value:11},
    {name:"khaled",value:12}]
  employeeGeneralSettingData:any=null;
  buttonClicked:string="";
  generalData:generalSettingData = {Id:0,Bonus:0,Discount:0,EmployeeID:0,VacationDay1:"",VacationDay2:""};
  generalDataForm=new FormGroup({
    id:new FormControl(),
    bonusControl:new FormControl(),
    discountControl:new FormControl(),
    vacationDay1Control:new FormControl(),
    vacationDay2Control:new FormControl(),
    empID:new FormControl()});
  days:string[] = ["Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"]
 
  constructor(public service:GeneralSettingService) {
    this.generalDataForm.controls['empID'].setValue(0);
   }

  ngOnInit(): void {
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
    if(this.generalDataForm.valid){
      this.generalData = { 
        Id:this.generalDataForm.controls['id'].value ,
        Bonus :this.generalDataForm.controls['bonusControl'].value,
        Discount :this.generalDataForm.controls['discountControl'].value,
        VacationDay1:this.generalDataForm.controls['vacationDay1Control'].value,
        VacationDay2:this.generalDataForm.controls['vacationDay2Control'].value,
        EmployeeID:this.generalDataForm.controls['empID'].value
      }
      console.log(this.generalData);
    }
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
  employeeSetting(){
    console.log(this.generalDataForm.controls['empID'].value);
    const id = this.generalDataForm.controls['empID'].value;
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
