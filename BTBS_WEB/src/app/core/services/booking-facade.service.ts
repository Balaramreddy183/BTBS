import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingService } from './booking.service';
import { Booking } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class BookingFacadeService {

  constructor(private bookingService: BookingService) { }

  createBooking(booking: Booking): Observable<Booking> {
    return this.bookingService.createBooking(booking);
  }

  getAllBookings(): Observable<Booking[]> {
    return this.bookingService.getAllBookings();
  }

  getBookingsByDate(date: Date): Observable<Booking[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return new Observable<Booking[]>(observer => {
      this.bookingService.getAllBookings().subscribe({
        next: (bookings) => {
          const filteredBookings = bookings.filter(booking => {
            const bookingDate = new Date(booking.travelDate);
            return bookingDate >= startOfDay && bookingDate <= endOfDay;
          });
          observer.next(filteredBookings);
          observer.complete();
        },
        error: (err) => {
          observer.error(err);
        }
      });
    });
  }

  getBookingById(id: string): Observable<Booking> {
    return this.bookingService.getBookingById(id);
  }

  deleteBooking(id: string): Observable<{ message: string }> {
    return this.bookingService.deleteBooking(id);
  }
}
