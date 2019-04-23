import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { TimesheetService } from '../shared/timesheet.service';

import { Timesheet } from '../shared/timesheet.model';

import { Observable } from 'rxjs';

import { AuthService } from '../../auth/auth.service'

@Component({
  selector: 'timesheets-list',
  templateUrl: './timesheets-list.component.html',
  styleUrls: ['./timesheets-list.component.scss'],
})
export class TimesheetsListComponent implements OnInit {
  timesheets:  Observable<Timesheet[]>;
  showSpinner = true;

  constructor(public timesheetService: TimesheetService, public dialog: MatDialog, public authService: AuthService) {

  }

  ngOnInit() {

    this.timesheets.subscribe((x:any) => {
      this.showSpinner = false;
    });
  }

  deleteTimesheets() {
    this.timesheetService.deleteAll();
  }

  // delete timesheet
  delete = (id) => {
    this.timesheetService.deleteTimesheet(id)
  }
}
