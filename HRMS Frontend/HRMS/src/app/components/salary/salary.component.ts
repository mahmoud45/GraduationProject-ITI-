import { Component } from '@angular/core';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent {

  years: number[];

  constructor() {
    // Create an array of years for the last two years
    this.years = [];
    const currentYear = new Date().getFullYear();
    for (let year = currentYear - 20; year <= currentYear; year++) {
      this.years.push(year);
    }}


}
