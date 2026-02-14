import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { LucideAngularModule, Calendar, Phone } from 'lucide-angular';

@Component({
  selector: 'app-booking-form',
  imports: [CommonModule, ReactiveFormsModule, DatePicker, InputTextModule, ButtonModule, LucideAngularModule],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})
export class BookingFormComponent implements OnInit {
  @Input() selectedSeats: string[] = [];
  @Output() formSubmit = new EventEmitter<{ travelDate: Date; mobileNumber: string }>();
  @Output() dateSelect = new EventEmitter<Date>();

  bookingForm!: FormGroup;
  today: Date = new Date();
  readonly Calendar = Calendar;
  readonly Phone = Phone;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.bookingForm = this.fb.group({
      travelDate: [this.today, Validators.required],
      mobileNumber: ['', [
        Validators.required,
        Validators.pattern('^[6-9][0-9]{9}$')
      ]]
    });

    this.bookingForm.get('travelDate')?.valueChanges.subscribe(date => {
      if (date) {
        this.dateSelect.emit(date);
      }
    });
  }

  onSubmit(): void {
    if (this.bookingForm.valid && this.selectedSeats.length > 0) {
      this.formSubmit.emit(this.bookingForm.value);
    }
  }

  get isFormValid(): boolean {
    return this.bookingForm.valid && this.selectedSeats.length > 0;
  }

  get seatCountClass(): string {
    const count = this.selectedSeats.length;
    if (count === 0) return 'text-slate-400';
    if (count >= 5) return 'text-amber-600 font-bold';
    return 'text-emerald-600 font-semibold';
  }
}
