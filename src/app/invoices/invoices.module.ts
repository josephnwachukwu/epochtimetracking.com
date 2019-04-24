import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { InvoiceService } from './invoice.service';

@NgModule({
  imports: [
    CommonModule,
    InvoicesRoutingModule
  ],
  declarations: [CreateInvoiceComponent, InvoiceListComponent, InvoiceDetailsComponent],
  providers: [InvoiceService],
  exports: [CreateInvoiceComponent, InvoiceListComponent, InvoiceDetailsComponent]
})
export class InvoicesModule { }
