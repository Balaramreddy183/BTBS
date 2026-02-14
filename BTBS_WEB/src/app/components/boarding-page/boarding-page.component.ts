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
  selectedDate: Date = new Date();
  bookings: Booking[] = [];
  loading = false;

  readonly Users = Users;
  readonly CheckCircle = CheckCircle;
  readonly Clock = Clock;
  readonly Calendar = Calendar;

  constructor(private facade: BoardingFacadeService) { }

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    if (!this.selectedDate) return;

    this.loading = true;
    this.facade.getBoardingBookings(this.selectedDate).subscribe({
      next: (data) => {
        this.bookings = data || [];
        this.loading = false;
      },
      error: () => {
        this.bookings = [];
        this.loading = false;
      }
    });
  }

  onDateChange(date: Date): void {
    this.selectedDate = date;
    this.loadBookings();
  }

  onBoardingStatusChange({ bookingId, boarded }: { bookingId: string; boarded: boolean }): void {
    this.facade.updateBoardingStatus(bookingId, boarded).subscribe({
      next: (updated) => {
        if (!updated) return;

        const index = this.bookings.findIndex(b => b.id === updated.id);
        if (index > -1) {
          this.bookings[index] = updated;
        }
      }
    });
  }

  get totalCount(): number {
    return this.bookings.length;
  }

  get boardedCount(): number {
    return this.bookings.filter(b => b.boarded).length;
  }

  get pendingCount(): number {
    return this.bookings.filter(b => !b.boarded).length;
  }
}
