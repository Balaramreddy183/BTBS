import { NgModule } from '@angular/core';

// Common Imports
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MenubarModule } from 'primeng/menubar';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';

// Export only necessary modules
@NgModule({
  imports: [
    ButtonModule,
    CardModule,
    InputTextModule,
    ToastModule,
    MenubarModule,
    CalendarModule,
    DialogModule,
    TableModule
  ],
  exports: [
    ButtonModule,
    CardModule,
    InputTextModule,
    ToastModule,
    MenubarModule,
    CalendarModule,
    DialogModule,
    TableModule
  ]
})
export class PrimengImports { }
