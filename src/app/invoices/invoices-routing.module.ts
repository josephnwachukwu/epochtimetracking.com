import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceDetailsComponent } from  './invoice-details/invoice-details.component';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { AuthService } from '../auth/auth.service';

const routes: Routes = [
	{ path: 'viewInvoice/:id', component: InvoiceDetailsComponent},
	{ path: 'createInvoice/:id', component: CreateInvoiceComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }
