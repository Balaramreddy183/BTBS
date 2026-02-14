import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeatComponent } from '../seat/seat.component';
import { LucideAngularModule, ArrowUp } from 'lucide-angular';

@Component({
  selector: 'app-seat-grid',
  imports: [CommonModule, SeatComponent, LucideAngularModule],
  templateUrl: './seat-grid.component.html',
  styleUrl: './seat-grid.component.css'
})
export class SeatGridComponent {
  @Input() bookedSeats: string[] = [];
  @Input() selectedSeats: string[] = [];
  @Output() seatSelectionChange = new EventEmitter<string[]>();

  readonly ArrowUp = ArrowUp;
  readonly rows = Array.from({ length: 15 }, (_, i) => i + 1);
  readonly maxSeats = 6;

  // Pricing logic
  readonly baseSeatPrice = 500;
  readonly windowSeatSurcharge = 50;

  isSeatBooked(seatId: string): boolean {
    return this.bookedSeats.includes(seatId);
  }

  isSeatSelected(seatId: string): boolean {
    return this.selectedSeats.includes(seatId);
  }

  getSeatType(seatId: string): 'window' | 'aisle' | 'middle' {
    const column = seatId.charAt(0);
    if (column === 'A' || column === 'D') {
      return 'window';
    }
    return 'middle';
  }

  getSeatPrice(seatId: string): number {
    const seatType = this.getSeatType(seatId);
    return seatType === 'window'
      ? this.baseSeatPrice + this.windowSeatSurcharge
      : this.baseSeatPrice;
  }

  onSeatClick(seatId: string): void {
    if (this.isSeatBooked(seatId)) {
      return;
    }

    const newSelection = [...this.selectedSeats];
    const index = newSelection.indexOf(seatId);

    if (index > -1) {
      // Deselect
      newSelection.splice(index, 1);
    } else {
      // Select (if under max limit)
      if (newSelection.length < this.maxSeats) {
        newSelection.push(seatId);
      }
    }

    this.seatSelectionChange.emit(newSelection);
  }

  get totalPrice(): number {
    return this.selectedSeats.reduce((total, seatId) => {
      return total + this.getSeatPrice(seatId);
    }, 0);
  }

  get windowSeatsCount(): number {
    return this.selectedSeats.filter(seatId => this.getSeatType(seatId) === 'window').length;
  }
}
