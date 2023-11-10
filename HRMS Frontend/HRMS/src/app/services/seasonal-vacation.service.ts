import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SeasonalVacation } from '../models/vacationModel/seasonal-vacation.model';

@Injectable({
  providedIn: 'root',
})
export class SeasonalVacationService {
  private apiUrl = 'https://localhost:7073/api';

  constructor(private http: HttpClient) {}

  getSeasonalVacations(): Observable<SeasonalVacation[]> {
    return this.http.get<SeasonalVacation[]>("https://localhost:7073/api/SeasonalVacation");
  }

  createSeasonalVacation(
    seasonalVacation: SeasonalVacation
  ): Observable<SeasonalVacation> {
    return this.http.post<SeasonalVacation>(
      "https://localhost:7073/api/SeasonalVacation",
      seasonalVacation
    );
  }

  updateSeasonalVacation(
    seasonalVacation: SeasonalVacation
  ): Observable<SeasonalVacation> {
    return this.http.put<SeasonalVacation>(
      `${this.apiUrl}/seasonalvacation/${seasonalVacation.id}`,
      seasonalVacation
    );
  }

  deleteSeasonalVacation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/seasonalvacation/${id}`);
  }
}
