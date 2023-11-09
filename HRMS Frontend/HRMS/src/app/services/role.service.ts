import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRoleCliamsModel } from '../models/roleModel';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private apiUrl = 'http://localhost:7073/api';

  constructor(private http: HttpClient) {}

  createRoleWithPermissions(data:IRoleCliamsModel): Observable<any> {

    return this.http.post(`${this.apiUrl}/addRolesWithClaims`, data);
  }
  
}
