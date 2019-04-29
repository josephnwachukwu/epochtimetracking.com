import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerInviteComponent } from './manager-invite/manager-invite.component'


const routes: Routes = [
	{path: 'manager/invite/:id', component: ManagerInviteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
