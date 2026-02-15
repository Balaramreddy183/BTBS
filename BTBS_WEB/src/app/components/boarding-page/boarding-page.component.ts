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
  boardingRows: BoardingRow[] = [];
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
        this.boardingRows = data as unknown as BoardingRow[];
        this.loading = false;
      },
      error: () => {
        this.boardingRows = [];
        this.loading = false;
      }
    });
  }

  onDateChange(date: Date): void {
    this.selectedDate = date;
    this.loadBookings();
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

        const index = this.boardingRows.findIndex(b => b.id === updated.id);
        if (index > -1) {
          const updatedRow = { ...this.boardingRows[index], ...updated };
          const newRows = [...this.boardingRows];
          newRows[index] = updatedRow;
          this.boardingRows = newRows;
        }
      }
    });
  }

  get totalCount(): number {
    return this.boardingRows.length;
  }

  get boardedCount(): number {
    return this.boardingRows.filter(b => b.boarded).length;
  }

  get pendingCount(): number {
    return this.boardingRows.filter(b => !b.boarded).length;
  }
}
