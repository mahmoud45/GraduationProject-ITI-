import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SeasonalVacation } from '../models/vacationModel/seasonal-vacation.model';

@Injectable({
  providedIn: 'root',
})
export class SeasonalVacationService {
    private apiUrl = 'http://localhost:7073/api';

  

  constructor(private http: HttpClient) {}

  getSeasonalVacations(): Observable<SeasonalVacation[]> {
    return this.http.get<SeasonalVacation[]>(`${this.apiUrl}/seasonalvacation`);
  }

  createSeasonalVacation(seasonalVacation: SeasonalVacation): Observable<SeasonalVacation> {
    return this.http.post<SeasonalVacation>(`${this.apiUrl}/seasonalvacation`, seasonalVacation);
  }

  updateSeasonalVacation(seasonalVacation: SeasonalVacation): Observable<SeasonalVacation> {
    return this.http.put<SeasonalVacation>(`${this.apiUrl}/seasonalvacation/${seasonalVacation.id}`, seasonalVacation);
  }

  deleteSeasonalVacation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/seasonalvacation/${id}`);
  }
}
