import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StyleGuideComponent } from './style-guide/style-guide.component';

import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: 'theme', component: StyleGuideComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})

export class ThemeRoutingModule { }