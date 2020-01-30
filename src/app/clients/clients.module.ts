import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { ClientService } from './client.service';

import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientRoutingModule } from './client-routing.module'
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ClientFormComponent } from './client-form/client-form.component';
import { TimesheetModule } from '../timesheets/shared/timesheet.module';
import { ProjectsModule } from '../projects/projects.module';
import { InvoicesModule } from '../invoices/invoices.module'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ClientRoutingModule,
    TimesheetModule,
    ProjectsModule,
    InvoicesModule,
    AngularFirestoreModule.enablePersistence(),
  ],
  declarations: [
    ClientsListComponent,
    ClientDetailComponent,
    ClientFormComponent,
  ],
  providers: [ClientService],
  exports: [ClientFormComponent]
})
export class ClientsModule { }
