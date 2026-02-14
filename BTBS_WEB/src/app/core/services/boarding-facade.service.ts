import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BoardingService } from './boarding.service';
import { Booking } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class BoardingFacadeService {

  constructor(private boardingService: BoardingService) { }

  getBoardingBookings(date: Date): Observable<Booking[]> {
    return this.boardingService.getBoardingBookings(date);
  }

  updateBoardingStatus(id: string, boarded: boolean): Observable<Booking> {
    return this.boardingService.updateBoardingStatus(id, boarded);
  }
}
