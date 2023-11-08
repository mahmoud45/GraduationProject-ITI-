import { generalSettingData } from './../models/iGeneralSetting-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralSettingService {
  api:string = "https://localhost:44324/";
  constructor(public http :HttpClient) { }
  getGeneralSettings():Observable <any>{
    return this.http.get(`${this.api}api/GeneralSettings`).pipe(
      catchError((error) => {

        return throwError(error);

      })
    );
  }
  createGeneralSettings(generalData:generalSettingData):Observable<any>{
    return this.http.post(`${this.api}General/SaveNew`,generalData).pipe(
      catchError((error) => {

        return throwError(error);

      })
    )
  }
  editGeneralSettings(generalEditedData:generalSettingData):Observable<any> {
   return this.http.put(`${this.api}Setting/EditGeneral`,generalEditedData).pipe(
    catchError((error) => {

      return throwError(error);

    })
   )
  }
  getGeneralSettingByEmpID(id:number): Observable<any>{
    return this.http.get(`${this.api}GeneralSetting/getbyempid/${id}`).pipe(
      catchError((error) => {

        return throwError(error);

      })
     )
  }
  getGeneralSettingByID(id:number): Observable<any>{
    return this.http.get(`${this.api}GeneralSetting/getbyid/${id}`).pipe(
      catchError((error) => {

        return throwError(error);

      })
     )
  }
}
