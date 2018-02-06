import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireDatabaseModule } from 'angularfire2/database';

import { SharedModule } from '../../shared/shared.module';

import { TimesheetService } from './timesheet.service';

import { TimesheetsListComponent } from '../timesheets-list/timesheets-list.component';
import { TimesheetFormComponent } from '../timesheet-form/timesheet-form.component';
import { TimesheetDetailComponent } from '../timesheet-detail/timesheet-detail.component';
import { StartDateComponent } from './components/start-date/start-date.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireDatabaseModule,
  ],
  declarations: [
    TimesheetsListComponent,
    TimesheetFormComponent,
    TimesheetDetailComponent,
    StartDateComponent,
  ],
  providers: [
    TimesheetService,
  ],
})
export class TimesheetModule { }
