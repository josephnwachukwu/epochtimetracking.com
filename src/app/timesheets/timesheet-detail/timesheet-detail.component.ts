import { Component, Input } from '@angular/core';
import { TimesheetService } from '../shared/timesheet.service';
import { Timesheet } from '../shared/timesheet';

@Component({
  selector: 'timesheet-detail',
  templateUrl: './timesheet-detail.component.html',
  styleUrls: ['./timesheet-detail.component.scss']
})
export class TimesheetDetailComponent {

  @Input() timesheet: Timesheet;

  constructor(public timesheetSvc: TimesheetService) { }

  updateTimeStamp() {
    const date = new Date().getTime();
    //this.timesheetSvc.updateTimesheet(this.timesheet.$key, { timeStamp: date });
  }

  updateStatus(timesheet: any) {
    timesheet.status = 'submitted';
    this.timesheetSvc.updateTimesheetStatus(timesheet.id, timesheet);
  }

  deleteTimesheet() {
    //console.log('this timesheets id is',  this.timesheet.id)
    this.timesheetSvc.deleteTimesheet(this.timesheet.id);
  }

}
