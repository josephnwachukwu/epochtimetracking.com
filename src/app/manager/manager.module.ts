import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerInviteComponent } from './manager-invite/manager-invite.component';
import { ManagerService } from './manager.service';
import { ManagerRegisterComponent } from './manager-register/manager-register.component';
import { ViewTimesheetsComponent } from './view-timesheets/view-timesheets.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component'
@NgModule({
  declarations: [ManagerInviteComponent, ManagerRegisterComponent, ViewTimesheetsComponent, ManagerDashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ManagerRoutingModule
  ],
  exports: [
  	ManagerInviteComponent
  ],
  providers: [ManagerService]
})
export class ManagerModule { }
