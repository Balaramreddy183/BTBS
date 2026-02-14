import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { LucideAngularModule, CheckCircle } from 'lucide-angular';
import { Booking } from '../../models';

@Component({
  selector: 'app-confirmation-modal',
  imports: [CommonModule, DialogModule, ButtonModule, LucideAngularModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css'
})
export class ConfirmationModalComponent {
  @Input() visible: boolean = false;
  @Input() booking: Booking | null = null;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() bookAnother = new EventEmitter<void>();

  readonly CheckCircle = CheckCircle;

  onHide(): void {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  onBookAnother(): void {
    this.onHide();
    this.bookAnother.emit();
  }
}
