import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";

import { AuthService } from '../../auth/auth.service';
import { TimesheetService } from '../../timesheets/shared/timesheet.service';

import { Observable } from 'rxjs';
import { Invoice } from '../invoice.model';
import { InvoiceService } from '../invoice.service';
import { LineItem } from '../lineItem.model';

import * as jsPDF from 'jspdf'

@Component({
  selector: 'create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss']
})
export class CreateInvoiceComponent implements OnInit {
	user:any;

	invoice:any = new Invoice();
	activeTab:string = 'edit';

  constructor(public auth: AuthService, public timesheetService: TimesheetService, private route: ActivatedRoute, public invoiceService: InvoiceService) { }

  ngOnInit() {
  	this.auth.user.subscribe((data) => {
  		this.user = data
  		this.invoice.userId = this.user.uid;
  		this.invoice.clientId =  this.route.snapshot.paramMap.get("id");
  		this.invoice.company = Object.assign({}, this.user.company)
  		this.invoice.agency = Object.assign({}, this.user.agency)
  		this.invoice.date = new Date().toDateString();
  		this.invoice.displayName = this.user.displayName
  	})
  }

  billableHours = (lineItem) => {
  	let billableHours:number = 0
  	for(let i in lineItem.projects) {
  		if( lineItem.projects[i].billable) {
  			billableHours += lineItem.projects[i].total
  		}
  	}
  	lineItem.billableHours = billableHours
  	return billableHours;
  }

  calculateTotalHours(lineItem, hours) {
  	return parseInt(this.invoice.agency.rate) * parseInt(hours)
  }

  toggleLineItem = (timesheet, event) => {
  	if(event.target.checked) {
  		this.invoice.lineItems.push(Object.assign({}, timesheet, new LineItem()))
  	}
  	else {
  		let pos = this.invoice.lineItems.map((e) => { return e.id; }).indexOf(timesheet.id);
  		this.invoice.lineItems.splice(pos,1)
  	}
  }
  calcSubtotal = () => {
	let subtotal = 0;
	for(let i in this.invoice.lineItems) {
	  subtotal += this.invoice.lineItems[i].billableHours * this.invoice.agency.rate
	}
	this.invoice.subtotal = subtotal;
	return subtotal;
  }
  calcTax = () => {
  	let amtWithTax = (this.invoice.subtotal * (parseInt(this.invoice.tax) / 100))
  	this.invoice.taxAmount = amtWithTax;
  	return amtWithTax
  }
  calcFinalTotal = () => {
  	let finalTotal = this.invoice.subtotal - this.invoice.taxAmount - this.invoice.discount;
  	this.invoice.finalTotal = finalTotal;
  	return finalTotal
  }

  toggleFeature = (feature, event) => {
  	this.invoice[feature] = event.target.checked
  }

  createInvoice(invoice) {
    this.invoiceService.createInvoice(invoice)
  }
}

