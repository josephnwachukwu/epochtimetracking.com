import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsModule } from '../clients/clients.module'

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ClientsModule,
    NgxChartsModule,
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
