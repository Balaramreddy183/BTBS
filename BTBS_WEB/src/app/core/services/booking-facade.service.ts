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

  getBookingById(id: string): Observable<Booking> {
    return this.bookingService.getBookingById(id);
  }

  deleteBooking(id: string): Observable<{ message: string }> {
    return this.bookingService.deleteBooking(id);
  }
}
