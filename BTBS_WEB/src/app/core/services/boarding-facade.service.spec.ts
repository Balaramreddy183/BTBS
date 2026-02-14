import { TestBed } from '@angular/core/testing';

import { BoardingFacadeService } from './boarding-facade.service';

describe('BoardingFacadeService', () => {
  let service: BoardingFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardingFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
