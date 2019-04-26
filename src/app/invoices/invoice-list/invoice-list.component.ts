import { Component, OnInit, Input } from '@angular/core';
import { InvoiceService } from '../invoice.service';
import { Invoice } from '../invoice.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {
  @Input() clientId:string;
	
  invoices: Observable<Invoice[]>;
  constructor(private invoiceService: InvoiceService) { }

  ngOnInit() {
  	this.invoices = this.invoiceService.getData(this.clientId)
  }

}
