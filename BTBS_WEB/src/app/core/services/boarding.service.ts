import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Booking } from '../../models';

@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class BoardingService {
  private apiUrl = `${environment.apiUrl}/boarding`;

  constructor(private http: HttpClient) { }

  getBoardingBookings(date: Date): Observable<Booking[]> {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    const params = new HttpParams().set('travelDate', dateStr);

    return this.http.get<Booking[]>(`${this.apiUrl}/getBoardingSequence`, { params });
  }

  updateBoardingStatus(id: string, boarded: boolean): Observable<Booking> {
    return this.http.patch<Booking>(`${environment.apiUrl}/bookings/updateBoardingStatus/${id}`, { boarded });
  }
}
