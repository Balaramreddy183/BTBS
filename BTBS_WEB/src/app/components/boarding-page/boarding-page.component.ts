import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DatePicker } from 'primeng/datepicker';
import { LucideAngularModule, Users, CheckCircle, Clock, Calendar } from 'lucide-angular';
import { Booking } from '../../models';
import { BoardingFacadeService } from '../../core/services/boarding-facade.service';
import { ConfirmationService } from 'primeng/api';

interface BoardingRow extends Booking {
  sequence: number;
  maxRow: number;
}

@Component({
  selector: 'app-boarding-page',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, ButtonModule, ConfirmDialogModule, DatePicker, LucideAngularModule],
  providers: [ConfirmationService],
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

  constructor(
    private facade: BoardingFacadeService,
    private confirmationService: ConfirmationService
  ) { }

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

  get boardingRows(): BoardingRow[] {
    // Calculate max row for each booking
    const rows = this.bookings.map(booking => {
      const maxRow = Math.max(...booking.seats.map(seat => parseInt(seat.substring(1)) || 0));
      return { ...booking, maxRow, sequence: 0 };
    });

    // Sort by max row descending (back to front)
    rows.sort((a, b) => b.maxRow - a.maxRow);

    // Assign sequence numbers
    rows.forEach((row, index) => {
      row.sequence = index + 1;
    });

    return rows;
  }

  onToggleBoarding(booking: Booking): void {
    if (booking.boarded) {
      // Confirm un-boarding
      this.confirmationService.confirm({
        message: `Are you sure you want to revert the boarding status for seats: ${booking.seats.join(', ')}?`,
        header: 'Revert Boarding',
        icon: 'pi pi-exclamation-triangle',
        acceptButtonStyleClass: 'p-button-danger p-button-text',
        rejectButtonStyleClass: 'p-button-text p-button-text',
        acceptIcon: 'none',
        rejectIcon: 'none',

        accept: () => {
          this.updateBoardingStatus(booking.id, false);
        }
      });
    } else {
      // Confirm boarding
      this.confirmationService.confirm({
        message: `Confirm passenger boarding for seats: ${booking.seats.join(', ')}?`,
        header: 'Board Passenger',
        icon: 'pi pi-check-circle',
        acceptButtonStyleClass: 'p-button-text p-button-text',
        rejectButtonStyleClass: 'p-button-text p-button-text',
        acceptIcon: 'none',
        rejectIcon: 'none',

        accept: () => {
          this.updateBoardingStatus(booking.id, true);
        }
      });
    }
  }

  formatSeats(seats: string[]): string {
    return seats.join(', ');
  }

  private updateBoardingStatus(bookingId: string, boarded: boolean): void {
    this.facade.updateBoardingStatus(bookingId, boarded).subscribe({
      next: (updated) => {
        if (!updated) return;

        const index = this.bookings.findIndex(b => b.id === updated.id);
        if (index > -1) {
          // Update the array reference to trigger change detection if needed, 
          // or just update the item. Since we use a getter for boardingRows, 
          // changing the item in 'bookings' is sufficient as getter recalculates on access 
          // (though Angular change detection needs to know).
          // Better to clone:
          const newBookings = [...this.bookings];
          newBookings[index] = updated;
          this.bookings = newBookings;
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
