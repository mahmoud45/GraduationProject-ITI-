import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeservicesService } from './../../../../services/employeeservices.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.css'],
})
export class AddEmpComponent {
  empval: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private employeeServices: EmployeeservicesService,private router:Router) {
    this.empval = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
      gender: ['', Validators.required],
      nationality: ['', Validators.required],
      nationalId: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      birthDate: ['', Validators.required],
      hireDate: ['', Validators.required],
      arrivalTime: ['', Validators.required],
      leaveTime: ['', Validators.required]
    });
  }

  onsubmitform() {
    this.submitted = true;

    if (this.empval.valid) {
      const formData = this.empval.value;

      const dates = {
        birthDate: formData.birthDate,
        hireDate: formData.hireDate,
        arrivalTime: formData.arrivalTime,
        leaveTime: formData.leaveTime,
      };

      const arrivalTime = this.convertTimeToDate(dates.arrivalTime);
      const leaveTime = this.convertTimeToDate(dates.leaveTime);

      const employeeData = { ...formData, arrivalTime, leaveTime };

      this.employeeServices.AddEmployee(employeeData).subscribe({
        next: () => {
          window.alert('Successfully added');
          this.router.navigate(['/employee']);
        },
        error: () => {
          console.error();
          window.alert('Error in adding');
        }
      });
    } else {
      window.alert('Please fill out all required fields and correct any validation errors.');
    }
  }

  convertTimeToDate(time: any): Date {
    if (typeof time === 'string' && /^\d{2}:\d{2}$/.test(time)) {
      const [hours, minutes] = time.split(':').map(Number);
      const date = new Date();
      date.setUTCHours(hours);
      date.setUTCMinutes(minutes);
      return date;
    } else {
      throw new Error('Invalid time format. Please use HH:mm format.');
    }
  }
}
