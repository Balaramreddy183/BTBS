import { TestBed } from '@angular/core/testing';

import { BookingFacadeService } from './booking-facade.service';

describe('BookingFacadeService', () => {
  let service: BookingFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
