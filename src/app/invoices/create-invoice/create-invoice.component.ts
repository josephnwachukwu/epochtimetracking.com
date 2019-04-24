import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { TimesheetService } from '../../timesheets/shared/timesheet.service';

@Component({
  selector: 'create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss']
})
export class CreateInvoiceComponent implements OnInit {
	user:any;
  constructor(public auth: AuthService, public timesheetService: TimesheetService) { }

  ngOnInit() {
  	this.auth.user.subscribe(data => this.user = data)
  }

}
