import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { TimesheetService } from '../shared/timesheet.service';

import { Timesheet } from '../shared/timesheet';

import { Observable } from 'rxjs';

import { StartDateComponent } from '../shared/components/start-date/start-date.component'

import { AuthService } from '../../core/auth.service'

@Component({
  selector: 'timesheets-list',
  templateUrl: './timesheets-list.component.html',
  styleUrls: ['./timesheets-list.component.scss'],
})
export class TimesheetsListComponent implements OnInit {
  //timesheets = null;
  timesheets:  Observable<Timesheet[]>;
  showSpinner = true;

  constructor(public timesheetService: TimesheetService, public dialog: MatDialog, public authService: AuthService) {
    // this.timesheets = this.timesheetService.getItemsList();
    // console.log('au', authService.user)
  }

  ngOnInit() {
    //this.timesheets = [];
    this.timesheets = this.timesheetService.getItemsList();
    this.timesheets.subscribe((x:any) => {
      this.showSpinner = false;
    });
  }

  deleteTimesheets() {
    this.timesheetService.deleteAll();
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(StartDateComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      //this.animal = result;
    });
  }
}
