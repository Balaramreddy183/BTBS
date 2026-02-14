import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { LucideAngularModule, Phone, CheckCircle, Clock } from 'lucide-angular';
import { Booking } from '../../models';

interface BoardingRow extends Booking {
  sequence: number;
  maxRow: number;
}

@Component({
  selector: 'app-boarding-table',
  imports: [CommonModule, TableModule, ButtonModule, LucideAngularModule],
  templateUrl: './boarding-table.component.html',
  styleUrl: './boarding-table.component.css'
})
export class BoardingTableComponent {
  @Input() bookings: Booking[] = [];
  @Output() boardingStatusChange = new EventEmitter<{ bookingId: string; boarded: boolean }>();

  readonly Phone = Phone;
  readonly CheckCircle = CheckCircle;
  readonly Clock = Clock;

  get boardingRows(): BoardingRow[] {
    // Calculate max row for each booking
    const rows = this.bookings.map(booking => {
      const maxRow = Math.max(...booking.seats.map(seat => parseInt(seat.substring(1))));
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
    this.boardingStatusChange.emit({
      bookingId: booking.id,
      boarded: !booking.boarded
    });
  }

  makePhoneCall(mobile: string): void {
    window.location.href = `tel:+91${mobile}`;
  }
}
