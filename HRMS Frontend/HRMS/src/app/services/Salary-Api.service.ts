import { SalaryPaginatedModel } from './../models/SalaryModels/Salary-Paginated-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SalaryDataModel } from '../models/SalaryModels/Salary-Data-model';
import { Observable } from 'rxjs';
import { PaginatedDTOModel } from '../models/SalaryModels/Paginated-DTO-Model';

@Injectable({
  providedIn: 'root',
})
export class SalaryApiService {
  constructor(public http: HttpClient) {}

  getSalaries(
    salaryPaginatedModel: SalaryPaginatedModel
  ): Observable<PaginatedDTOModel> {
    return this.http.get<PaginatedDTOModel>(
      'https://localhost:44324/api/Salary/Get?pageNumber=' +
        salaryPaginatedModel.pageNumber +
        '&pageSize=' +
        salaryPaginatedModel.pageSize +
        '&search=' +
        salaryPaginatedModel.search +
        '&month=' +
        salaryPaginatedModel.month +
        '&year=' +
        salaryPaginatedModel.year
    );
  }
}
