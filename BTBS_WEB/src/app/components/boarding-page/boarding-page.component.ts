import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BoardingTableComponent } from '../boarding-table/boarding-table.component';
import { DatePicker } from 'primeng/datepicker';
import { LucideAngularModule, Users, CheckCircle, Clock, Calendar } from 'lucide-angular';
import { Booking } from '../../models';
import { BoardingFacadeService } from '../../core/services/boarding-facade.service';

@Component({
  selector: 'app-boarding-page',
  imports: [CommonModule, FormsModule, BoardingTableComponent, DatePicker, LucideAngularModule],
  templateUrl: './boarding-page.component.html',
  styleUrl: './boarding-page.component.css'
})
export class BoardingPageComponent implements OnInit {
  selectedDate: Date | null = new Date();
  allBookings: Booking[] = [];
  loading: boolean = false;

  readonly Users = Users;
  readonly CheckCircle = CheckCircle;
  readonly Clock = Clock;
  readonly Calendar = Calendar;

  constructor(private boardingFacade: BoardingFacadeService) { }

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    if (!this.selectedDate) return;

    this.loading = true;
    this.boardingFacade.getBoardingBookings(this.selectedDate).subscribe(bookings => {
      this.allBookings = bookings;
      this.loading = false;
    });
  }

  // Watch for date changes (called by ngModelChange if added or just implied by binding)
  // Since we use [(ngModel)], we need to listen for changes. 
  // Getting date changes via ngModel requires (ngModelChange)="onDateChange($event)" in template
  // or a setter. Let's assume the template has (ngModelChange) or we add it.

  onDateChange(date: Date): void {
    this.selectedDate = date;
    this.loadBookings();
  }

  get filteredBookings(): Booking[] {
    return this.allBookings; // API already filters by date
  }

  get totalBookings(): number {
    return this.allBookings.length;
  }

  get boardedCount(): number {
    return this.allBookings.filter(b => b.boarded).length;
  }

  get pendingCount(): number {
    return this.allBookings.filter(b => !b.boarded).length;
  }

  onBoardingStatusChange(event: { bookingId: string; boarded: boolean }): void {
    this.boardingFacade.updateBoardingStatus(event.bookingId, event.boarded).subscribe(updatedBooking => {
      if (updatedBooking) {
        // Update local state
        const index = this.allBookings.findIndex(b => b.id === updatedBooking.id);
        if (index !== -1) {
          this.allBookings[index] = updatedBooking;
        }
      }
    });
  }
}
