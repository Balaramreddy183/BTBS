import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { BookingService } from './booking.service';
import { Booking } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class BookingFacadeService {

  constructor(private bookingService: BookingService) { }

  // Create booking - simple and clean
  createBooking(booking: Booking): Observable<Booking | null> {
    return this.bookingService.createBooking(booking).pipe(
      map(result => result),
      catchError(error => {
        console.error('Error creating booking:', error);
        return of(null);
      })
    );
  }

  // Get all bookings
  getAllBookings(): Observable<Booking[]> {
    return this.bookingService.getAllBookings().pipe(
      catchError(error => {
        console.error('Error fetching bookings:', error);
        return of([]);
      })
    );
  }

  // Get booking by ID
  getBookingById(id: string): Observable<Booking | null> {
    return this.bookingService.getBookingById(id).pipe(
      catchError(error => {
        console.error('Error fetching booking:', error);
        return of(null);
      })
    );
  }

  // Delete booking
  deleteBooking(id: string): Observable<boolean> {
    return this.bookingService.deleteBooking(id).pipe(
      map(() => true),
      catchError(error => {
        console.error('Error deleting booking:', error);
        return of(false);
      })
    );
  }
}
