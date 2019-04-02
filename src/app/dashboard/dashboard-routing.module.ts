import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Pages
import { DashboardComponent } from './dashboard.component'

// Security
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
	{path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class DashboardRoutingModule { }
