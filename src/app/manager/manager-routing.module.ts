import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerInviteComponent } from './manager-invite/manager-invite.component';
import { ManagerRegisterComponent } from './manager-register/manager-register.component';
import { ViewTimesheetsComponent } from './view-timesheets/view-timesheets.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component'


const routes: Routes = [
	{path: 'manager/invite/:id', component: ManagerInviteComponent},
	{path: 'manager/register/:id', component: ManagerRegisterComponent},
	{path: 'manager/timesheets/view/:id', component: ViewTimesheetsComponent},
	{path: 'manager/dashboard/:id', component: ManagerDashboardComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
