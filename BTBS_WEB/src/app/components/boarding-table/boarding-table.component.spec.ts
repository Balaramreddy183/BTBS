import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardingTableComponent } from './boarding-table.component';

describe('BoardingTableComponent', () => {
  let component: BoardingTableComponent;
  let fixture: ComponentFixture<BoardingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardingTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
