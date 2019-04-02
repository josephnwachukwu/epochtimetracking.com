import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { UserLoginComponent } from './ui/user-login/user-login.component';
//import { UserProfileComponent } from './ui/user-profile/user-profile.component';

import { TimesheetsListComponent } from './timesheets/timesheets-list/timesheets-list.component'
import { ReadmePageComponent } from './readme-page/readme-page.component';

import { ProjectsListComponent } from './projects/projects-list/projects-list.component';
import { ClientsListComponent } from './clients/clients-list/clients-list.component';

//import { UploadPageComponent } from './uploads/upload-page/upload-page.component';

import { AuthGuard } from './core/auth.guard';
import { CoreModule } from './core/core.module';

import { AuthModule } from './auth/auth.module'

const routes: Routes = [
  { path: '', component: ReadmePageComponent },
  //{ path: 'login', component: UserLoginComponent },

  //{ }
  { path: 'timesheets', component: TimesheetsListComponent, canActivate: [AuthGuard] },

  { path: 'projects', component: ProjectsListComponent,  canActivate: [AuthGuard] },
  { path: 'clients', component: ClientsListComponent,  canActivate: [AuthGuard] },
  //{ path: 'profile', component: UserProfileComponent,  canActivate: [AuthGuard] },
  //{ path: 'uploads',  component: UploadPageComponent,  canActivate: [AuthGuard] },
  // uploads are lazy loaded
  //{ path: 'uploads', loadChildren: './uploads/shared/upload.module#UploadModule', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule { }
