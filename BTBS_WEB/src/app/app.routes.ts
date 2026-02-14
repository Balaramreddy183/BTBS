import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'booking',
        pathMatch: 'full'
    },
    {
        path: 'booking',
        loadComponent: () => import('./components/booking-page/booking-page.component').then(m => m.BookingPageComponent)
    },
    {
        path: 'boarding',
        loadComponent: () => import('./components/boarding-page/boarding-page.component').then(m => m.BoardingPageComponent)
    },
    {
        path: '**',
        redirectTo: 'booking'
    }
];
