import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

// Firebase
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

// RxJs
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Services
import { InvoiceService } from '../invoice.service'

// Models
import { Invoice } from '../invoice.model'
@Component({
  selector: 'invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss'],
})
export class InvoiceDetailsComponent implements OnInit {

  // Id from the route
  id:string;
  invoiceId: string
  private invoiceDocument: AngularFirestoreDocument<Invoice>;
  invoice: Observable<Invoice>;
  constructor(invoiceService: InvoiceService, private route: ActivatedRoute, private afs: AngularFirestore) { }

  ngOnInit() {
  	this.invoiceId = this.route.snapshot.paramMap.get("id");
  	this.invoiceDocument = this.afs.doc<Invoice>('invoices/' + this.invoiceId);
  	this.invoice = this.invoiceDocument.valueChanges();
  }

  lineItemTotal = (hours, rate) => {
  	return parseInt(hours) * parseInt(rate);
  }

  calculateTotal = (invoice) => {
  	let total = 0;
  	for(let i in invoice.lineItems) {
  		console.log('iar',invoice.agency.rate)
  		console.log('ith', invoice.lineItems[i].totalHours)
  		let r = invoice.agency.rate
  		let h = invoice.lineItems[i].totalHours
  		total +=  h * r
  	}

  	return total;
  }

}
