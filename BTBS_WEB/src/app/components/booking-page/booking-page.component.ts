import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { LucideAngularModule, MapPin, Clock, Info, Calendar, Phone, CheckCircle, ArrowUp } from 'lucide-angular';
import { Booking, JourneyDetails } from '../../models';
import { BookingFacadeService } from '../../core/services/booking-facade.service';

@Component({
  selector: 'app-booking-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DatePicker,
    InputTextModule,
    ButtonModule,
    DialogModule,
    LucideAngularModule
  ],
  templateUrl: './booking-page.component.html',
  styleUrl: './booking-page.component.css'
})
export class BookingPageComponent implements OnInit {
  bookingForm!: FormGroup;
  selectedSeats: string[] = [];
  bookedSeats: string[] = [];

  // Grid Config
  readonly rows = Array.from({ length: 15 }, (_, i) => i + 1);
  readonly maxSeats = 6;
  readonly baseSeatPrice = 500;
  readonly windowSeatSurcharge = 50;

  // Confirmation Modal
  showConfirmation = false;
  confirmedBooking: Booking | null = null;
  loading = false;

  // Icons
  readonly MapPin = MapPin;
  readonly Clock = Clock;
  readonly Info = Info;
  readonly Calendar = Calendar;
  readonly Phone = Phone;
  readonly CheckCircle = CheckCircle;
  readonly ArrowUp = ArrowUp;

  // Journey Mock
  journey: JourneyDetails = {
    from: 'Hyderabad',
    to: 'Bangalore',
    departureTime: '10:30 PM',
    arrivalTime: '06:00 AM',
    duration: '7h 30m',
    busType: 'AC Sleeper',
    busNumber: 'TS 09 AB 1234'
  };

  today: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private bookingFacade: BookingFacadeService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadBookedSeats(new Date());
  }

  initForm(): void {
    this.bookingForm = this.fb.group({
      travelDate: [new Date(), Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]]
    });

    this.bookingForm.get('travelDate')?.valueChanges.subscribe(date => {
      if (date) {
        this.selectedSeats = [];
        this.loadBookedSeats(date);
      }
    });
  }

  loadBookedSeats(date: Date): void {
    this.bookingFacade.getBookingsByDate(date).subscribe({
      next: (bookings) => {
        this.bookedSeats = bookings.flatMap(b => b.seats);
      },
      error: () => this.bookedSeats = []
    });
  }

  // Seat Logic
  isSeatBooked(seatId: string): boolean {
    return this.bookedSeats.includes(seatId);
  }

  isSeatSelected(seatId: string): boolean {
    return this.selectedSeats.includes(seatId);
  }

  getSeatType(seatId: string): 'window' | 'aisle' | 'middle' {
    const column = seatId.charAt(0);
    return (column === 'A' || column === 'D') ? 'window' : 'middle';
  }

  getSeatPrice(seatId: string): number {
    return this.getSeatType(seatId) === 'window'
      ? this.baseSeatPrice + this.windowSeatSurcharge
      : this.baseSeatPrice;
  }

  onSeatClick(seatId: string): void {
    if (this.isSeatBooked(seatId)) return;

    const index = this.selectedSeats.indexOf(seatId);
    if (index > -1) {
      this.selectedSeats.splice(index, 1);
    } else {
      if (this.selectedSeats.length < this.maxSeats) {
        this.selectedSeats.push(seatId);
      }
    }
  }

  getSeatClasses(seatId: string): string {
    const isBooked = this.isSeatBooked(seatId);
    const isSelected = this.isSeatSelected(seatId);
    const type = this.getSeatType(seatId);

    const base = 'relative w-12 h-14 rounded border transition-all duration-150 flex flex-col items-center justify-center';

    if (isBooked) return `${base} bg-slate-300 text-slate-500 cursor-not-allowed border-slate-400`;
    if (isSelected) return `${base} bg-red-600 text-white border-red-700 font-semibold`;
    if (type === 'window') return `${base} bg-white text-slate-700 border-red-400 hover:border-red-500 hover:bg-red-50 cursor-pointer`;

    return `${base} bg-white text-slate-700 border-slate-300 hover:border-slate-400 hover:bg-slate-50 cursor-pointer`;
  }

  getSeatTooltip(seatId: string): string {
    if (this.isSeatBooked(seatId)) return `Seat ${seatId} - Booked`;
    const price = this.getSeatPrice(seatId);
    return `Seat ${seatId} - ₹${price}`;
  }

  // Computed Properties
  get totalPrice(): number {
    return this.selectedSeats.reduce((total, seatId) => total + this.getSeatPrice(seatId), 0);
  }

  get windowSeatsCount(): number {
    return this.selectedSeats.filter(id => this.getSeatType(id) === 'window').length;
  }

  get seatCountClass(): string {
    const count = this.selectedSeats.length;
    if (count === 0) return 'text-slate-400';
    if (count >= 5) return 'text-amber-600 font-bold';
    return 'text-emerald-600 font-semibold';
  }

  get isFormValid(): boolean {
    return this.bookingForm.valid && this.selectedSeats.length > 0;
  }

  // Submit Logic
  onSubmit(): void {
    if (!this.isFormValid) return;

    this.loading = true;
    const formVal = this.bookingForm.value;
    const bookingId = `BTBS-${Date.now()}`;

    const newBooking: Booking = {
      id: bookingId,
      travelDate: formVal.travelDate,
      mobileNumber: formVal.mobileNumber,
      seats: [...this.selectedSeats],
      boarded: false,
      createdAt: new Date(),
      totalAmount: this.totalPrice
    };

    this.bookingFacade.createBooking(newBooking).subscribe({
      next: (booking) => {
        this.loading = false;
        this.confirmedBooking = booking;
        this.showConfirmation = true;
        this.loadBookedSeats(formVal.travelDate);
        this.selectedSeats = [];
        this.bookingForm.get('mobileNumber')?.reset();
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onBookAnother(): void {
    this.showConfirmation = false;
    this.selectedSeats = [];
    this.confirmedBooking = null;
    this.bookingForm.get('mobileNumber')?.reset();
  }
}
