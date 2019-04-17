import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Timesheet } from '../shared/timesheet.model';

@Component({
  selector: 'timesheet-detail-modal',
  templateUrl: './timesheet-detail-modal.component.html',
  styleUrls: ['./timesheet-detail-modal.component.scss']
})

export class TimesheetDetailModalComponent implements OnInit {

  @Output() closeModal = new EventEmitter<boolean>()
  @Input() timesheet: Timesheet;

  constructor() { }

  ngOnInit() {

  }


  close = () => {
  	this.closeModal.emit(true);
  }

}
