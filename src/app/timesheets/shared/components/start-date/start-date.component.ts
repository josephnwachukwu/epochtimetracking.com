import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { TimesheetService } from '../../timesheet.service'
import { MatDatepicker, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'



@Component({
  selector: 'start-date',
  templateUrl: './start-date.component.html',
  styleUrls: ['./start-date.component.scss']
})
export class StartDateComponent implements OnInit {
	@ViewChild(MatDatepicker) datepicker: MatDatepicker<Date>;
	date:string;
  constructor(public tss: TimesheetService, public dialogRef: MatDialogRef<StartDateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  closeDialog(): void {
    this.dialogRef.close()
  }
}
