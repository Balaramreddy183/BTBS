import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { BoardingService } from './boarding.service';
import { Booking } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class BoardingFacadeService {

  constructor(private boardingService: BoardingService) { }

  // Get bookings for boarding
  getBoardingBookings(date: Date): Observable<Booking[]> {
    return this.boardingService.getBoardingBookings(date).pipe(
      catchError(error => {
        console.error('Error fetching boarding bookings:', error);
        return of([]);
      })
    );
  }

  // Update boarding status
  updateBoardingStatus(id: string, boarded: boolean): Observable<Booking | null> {
    return this.boardingService.updateBoardingStatus(id, boarded).pipe(
      catchError(error => {
        console.error('Error updating boarding status:', error);
        return of(null);
      })
    );
  }
}
