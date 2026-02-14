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
  showConfirmation: boolean = false;
  confirmedBooking: Booking | null = null;
  loading: boolean = false;

  readonly MapPin = MapPin;
  readonly Clock = Clock;
  readonly Info = Info;

  // Journey details (mock data - would come from API)
  journeyDetails: JourneyDetails = {
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
    this.bookingFacade.getAllBookings().subscribe(bookings => {
      // Extract all booked seats from all bookings
      this.bookedSeats = bookings.flatMap(booking => booking.seats);
    });
  }

  onSeatSelectionChange(seats: string[]): void {
    this.selectedSeats = seats;
  }

  onFormSubmit(formData: { travelDate: Date; mobileNumber: string }): void {
    this.loading = true;
    const bookingId = `BTBS-${Date.now()}`; // Simple ID generation

    const newBooking: Booking = {
      id: bookingId,
      travelDate: formData.travelDate,
      mobileNumber: formData.mobileNumber,
      seats: [...this.selectedSeats],
      boarded: false,
      createdAt: new Date(),
      totalAmount: this.calculateTotalPrice()
    };

    this.bookingFacade.createBooking(newBooking).subscribe(booking => {
      this.loading = false;
      if (booking) {
        this.confirmedBooking = booking;
        this.showConfirmation = true;
        this.loadBookedSeats(); // Refresh booked seats
        this.selectedSeats = []; // Clear selection
      } else {
        // Handle error (facade logs it)
        alert('Failed to create booking. Please try again.');
      }
    });
  }

  onBookAnother(): void {
    this.selectedSeats = [];
    this.showConfirmation = false;
    this.confirmedBooking = null;
  }

  private calculateTotalPrice(): number {
    const baseSeatPrice = 500;
    const windowSeatSurcharge = 50;

    return this.selectedSeats.reduce((total, seatId) => {
      const column = seatId.charAt(0);
      const isWindowSeat = column === 'A' || column === 'D';
      return total + baseSeatPrice + (isWindowSeat ? windowSeatSurcharge : 0);
    }, 0);
  }
}
