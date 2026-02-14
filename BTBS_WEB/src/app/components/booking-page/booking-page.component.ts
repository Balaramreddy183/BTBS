import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingFormComponent } from '../booking-form/booking-form.component';
import { SeatGridComponent } from '../seat-grid/seat-grid.component';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { LucideAngularModule, MapPin, Clock, Info } from 'lucide-angular';
import { Booking, JourneyDetails } from '../../models';
import { BookingFacadeService } from '../../core/services/booking-facade.service';

@Component({
  selector: 'app-booking-page',
  imports: [CommonModule, BookingFormComponent, SeatGridComponent, ConfirmationModalComponent, LucideAngularModule],
  templateUrl: './booking-page.component.html',
  styleUrl: './booking-page.component.css'
})
export class BookingPageComponent implements OnInit {
  selectedSeats: string[] = [];
  bookedSeats: string[] = [];
  showConfirmation = false;
  confirmedBooking: Booking | null = null;
  loading = false;

  readonly MapPin = MapPin;
  readonly Clock = Clock;
  readonly Info = Info;

  // Mock Journey details
  journey: JourneyDetails = {
    from: 'Hyderabad',
    to: 'Bangalore',
    departureTime: '10:30 PM',
    arrivalTime: '06:00 AM',
    duration: '7h 30m',
    busType: 'AC Sleeper',
    busNumber: 'TS 09 AB 1234'
  };

  constructor(private bookingFacade: BookingFacadeService) { }

  ngOnInit(): void {
    this.loadBookedSeats();
  }

  loadBookedSeats(): void {
    this.bookingFacade.getAllBookings().subscribe({
      next: (bookings) => {
        this.bookedSeats = bookings.flatMap(b => b.seats);
      },
      error: () => this.bookedSeats = []
    });
  }

  onSeatSelectionChange(seats: string[]): void {
    this.selectedSeats = seats;
  }

  onFormSubmit(formData: { travelDate: Date; mobileNumber: string }): void {
    this.loading = true;
    const bookingId = `BTBS-${Date.now()}`;

    const newBooking: Booking = {
      id: bookingId,
      ...formData,
      seats: [...this.selectedSeats],
      boarded: false,
      createdAt: new Date(),
      totalAmount: this.calculateTotalPrice()
    };

    this.bookingFacade.createBooking(newBooking).subscribe({
      next: (booking) => {
        this.loading = false;
        this.confirmedBooking = booking;
        this.showConfirmation = true;
        this.loadBookedSeats();
        this.selectedSeats = [];
      },
      error: () => {
        this.loading = false;
        alert('Booking failed. Please try again.');
      }
    });
  }

  onBookAnother(): void {
    this.selectedSeats = [];
    this.showConfirmation = false;
    this.confirmedBooking = null;
  }

  private calculateTotalPrice(): number {
    const BASE_PRICE = 500;
    const WINDOW_SURCHARGE = 50;

    return this.selectedSeats.reduce((total, seat) => {
      const isWindow = seat.startsWith('A') || seat.startsWith('D');
      return total + BASE_PRICE + (isWindow ? WINDOW_SURCHARGE : 0);
    }, 0);
  }
}
