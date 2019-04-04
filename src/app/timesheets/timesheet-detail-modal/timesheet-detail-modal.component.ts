import { Component, OnInit, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'timesheet-detail-modal',
  templateUrl: './timesheet-detail-modal.component.html',
  styleUrls: ['./timesheet-detail-modal.component.scss']
})
export class TimesheetDetailModalComponent implements OnInit {
	@Input() timesheetId: string;
  constructor() { }

  ngOnInit() {
  }

}
