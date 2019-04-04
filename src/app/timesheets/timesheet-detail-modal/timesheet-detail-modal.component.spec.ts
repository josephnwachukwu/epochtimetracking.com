import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetDetailModalComponent } from './timesheet-detail-modal.component';

describe('TimesheetDetailModalComponent', () => {
  let component: TimesheetDetailModalComponent;
  let fixture: ComponentFixture<TimesheetDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
