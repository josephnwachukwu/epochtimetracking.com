import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

///// Start FireStarter

// Core
import { CoreModule } from './core/core.module';

// Auth
import { AuthModule } from './auth/auth.module'
// Shared/Widget
import { SharedModule } from './shared/shared.module';

// Feature Modules
import { TimesheetModule } from './timesheets/shared/timesheet.module';
//import { UploadsModule } from './uploads/uploads.module';
import { UiModule } from './ui/shared/ui.module';
import { ProjectsModule } from './projects/projects.module';
import { ClientsModule } from './clients/clients.module';
import { DashboardModule } from './dashboard/dashboard.module'

///// End FireStarter
import { ReadmePageComponent } from './readme-page/readme-page.component';
import { environment } from '../environments/environment';

import { AngularFireModule } from 'angularfire2';
//export const firebaseConfig = environment.firebaseConfig;
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { StartDateComponent } from './timesheets/shared/components/start-date/start-date.component'

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatDatepickerModule,
        MatDialogModule,
        MatInputModule,
        MatNativeDateModule,
        MatFormFieldModule, } from '@angular/material';

// Theme, Header, Footer
import { ThemeModule } from './theme/theme.module';

// Services
import { AppConfigService } from './app.config'
@NgModule({
  declarations: [
    AppComponent,
    ReadmePageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    UiModule,
    ProjectsModule,
    ClientsModule,
    TimesheetModule,
    AuthModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatInputModule,
    MatNativeDateModule,
    MatFormFieldModule,
    ThemeModule,
    DashboardModule,
    AngularFireModule.initializeApp(environment.firebase, 'firestarter'),
  ],
  providers: [AppConfigService],
  bootstrap: [
    AppComponent,
  ],
  entryComponents: [
    StartDateComponent
  ]
})
export class AppModule { }
