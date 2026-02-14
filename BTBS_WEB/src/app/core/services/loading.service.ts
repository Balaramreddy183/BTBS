import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    private loadingCount = 0;
    private loading$ = new BehaviorSubject<boolean>(false);

    // Observable for components to subscribe
    isLoading$ = this.loading$.asObservable();

    show() {
        this.loadingCount++;
        this.loading$.next(true);
    }

    hide() {
        this.loadingCount--;
        if (this.loadingCount <= 0) {
            this.loadingCount = 0;
            this.loading$.next(false);
        }
    }
}
