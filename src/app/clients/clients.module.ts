import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { ClientService } from './client.service';

import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { ClientFormComponent } from './client-form/client-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
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
