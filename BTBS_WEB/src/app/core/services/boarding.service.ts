import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Booking } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class BoardingService {
  private baseUrl = `${environment.apiUrl}/bookings`;

  constructor(private http: HttpClient) { }

  // Get bookings for boarding by date
  getBoardingBookings(date: Date): Observable<Booking[]> {
    const dateString = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const params = new HttpParams().set('date', dateString);

    return this.http.get<Booking[]>(`${this.baseUrl}/getBoardingBookings`, { params });
  }

  // Update boarding status
  updateBoardingStatus(id: string, boarded: boolean): Observable<Booking> {
    return this.http.patch<Booking>(`${this.baseUrl}/updateBoardingStatus/${id}`, { boarded });
  }
}
