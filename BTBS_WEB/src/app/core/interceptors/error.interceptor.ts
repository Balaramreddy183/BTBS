import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

// Simple error interceptor - shows user-friendly messages
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    return next(req).pipe(
        catchError((error) => {
            let errorMessage = 'An error occurred';

            if (error.error?.message) {
                // Backend error message
                errorMessage = error.error.message;
            } else if (error.status === 0) {
                // Network error
                errorMessage = 'Unable to connect to server. Please check your connection.';
            } else if (error.status === 404) {
                errorMessage = 'Resource not found';
            } else if (error.status === 500) {
                errorMessage = 'Server error. Please try again later.';
            }

            console.error('HTTP Error:', errorMessage, error);

            // You can show a toast notification here if needed
            // For now, just log and re-throw
            return throwError(() => new Error(errorMessage));
        })
    );
};
