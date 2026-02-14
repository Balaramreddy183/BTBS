import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seat',
  imports: [CommonModule],
  templateUrl: './seat.component.html',
  styleUrl: './seat.component.css'
})
export class SeatComponent {
  @Input() seatId!: string;
  @Input() isBooked: boolean = false;
  @Input() isSelected: boolean = false;
  @Input() price: number = 500;
  @Input() seatType: 'window' | 'aisle' | 'middle' = 'middle';
  @Output() seatClicked = new EventEmitter<string>();

  onSeatClick(): void {
    if (!this.isBooked) {
      this.seatClicked.emit(this.seatId);
    }
  }

  getSeatClasses(): string {
    const baseClasses = 'relative w-12 h-14 rounded border transition-all duration-150 flex flex-col items-center justify-center';

    if (this.isBooked) {
      return `${baseClasses} bg-slate-300 text-slate-500 cursor-not-allowed border-slate-400`;
    }

    if (this.isSelected) {
      return `${baseClasses} bg-red-600 text-white border-red-700 font-semibold`;
    }

    // Window seats
    if (this.seatType === 'window') {
      return `${baseClasses} bg-white text-slate-700 border-red-400 hover:border-red-500 hover:bg-red-50 cursor-pointer`;
    }

    return `${baseClasses} bg-white text-slate-700 border-slate-300 hover:border-slate-400 hover:bg-slate-50 cursor-pointer`;
  }

  getTooltipText(): string {
    if (this.isBooked) {
      return `Seat ${this.seatId} - Booked`;
    }
    const typeText = this.seatType === 'window' ? 'Window' : this.seatType === 'aisle' ? 'Aisle' : '';
    return `Seat ${this.seatId}${typeText ? ' - ' + typeText : ''} - ₹${this.price}`;
  }
}
