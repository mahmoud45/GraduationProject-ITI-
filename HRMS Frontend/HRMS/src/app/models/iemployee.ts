import { Data } from "@angular/router";

export interface IEmployee {
    id:number;
    firstName:string;
    lastName:string;
    address:string;
    phone:Number;
    hireDate:Data;
    gender:string;
    nationality:string;
    birthDate:Data;
    nationalId:number;
    salary:Number;
    arrivalTime:Data;
    leaveTime:Data;
}
