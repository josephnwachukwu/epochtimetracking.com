import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Pages
import { ClientDetailComponent } from './client-detail/client-detail.component'

// Security
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
	{path: 'client/:id', component: ClientDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class ClientRoutingModule { }