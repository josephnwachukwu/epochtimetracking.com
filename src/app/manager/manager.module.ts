import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerInviteComponent } from './manager-invite/manager-invite.component';
import { ManagerService } from './manager.service';
import { ManagerRegisterComponent } from './manager-register/manager-register.component';
import { ViewTimesheetsComponent } from './view-timesheets/view-timesheets.component'
@NgModule({
  declarations: [ManagerInviteComponent, ManagerRegisterComponent, ViewTimesheetsComponent],
  imports: [
    CommonModule,
    ManagerRoutingModule
  ],
  exports: [
  	ManagerInviteComponent
  ],
  providers: [ManagerService]
})
export class ManagerModule { }
