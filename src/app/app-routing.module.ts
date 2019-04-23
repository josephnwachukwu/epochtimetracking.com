import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components TODO: move to modules
import { TimesheetsListComponent } from './timesheets/timesheets-list/timesheets-list.component'
//import { ReadmePageComponent } from './readme-page/readme-page.component';
import { ProjectsListComponent } from './projects/projects-list/projects-list.component';


// Auth
import { AuthModule } from './auth/auth.module'
import { AuthGuard } from './core/auth.guard';
import { CoreModule } from './core/core.module';

const routes: Routes = [
  //{ path: '', component: ReadmePageComponent },
  //{ path: 'timesheets', component: TimesheetsListComponent, canActivate: [AuthGuard] },
  //{ path: 'projects', component: ProjectsListComponent,  canActivate: [AuthGuard] },
  //{ path: 'clients', component: ClientsListComponent,  canActivate: [AuthGuard] },
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
