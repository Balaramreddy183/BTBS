import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../../core/services/loading.service';

// Simple loading interceptor - tracks HTTP requests
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
    const loadingService = inject(LoadingService);

    loadingService.show();

    return next(req).pipe(
        finalize(() => loadingService.hide())
    );
};
