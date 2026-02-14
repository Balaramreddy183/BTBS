import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Booking } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class BoardingService {
  private apiUrl = `${environment.apiUrl}/bookings`; // Using bookings endpoint for now

  constructor(private http: HttpClient) { }

  getBoardingBookings(date: Date): Observable<Booking[]> {
    const dateStr = date.toISOString().split('T')[0];
    const params = new HttpParams().set('date', dateStr);

    return this.http.get<Booking[]>(`${this.apiUrl}/getBoardingBookings`, { params });
  }

  updateBoardingStatus(id: string, boarded: boolean): Observable<Booking> {
    return this.http.patch<Booking>(`${this.apiUrl}/updateBoardingStatus/${id}`, { boarded });
  }
}
