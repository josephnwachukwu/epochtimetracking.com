import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// Angular Material
import {MatDatepickerModule,
        MatDialogModule,
        MatInputModule,
        MatNativeDateModule,
        MatFormFieldModule, } from '@angular/material';

// App
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemeModule } from './theme/theme.module';
import { AppConfigService } from './app.config';

///// Start FireStarter
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
///// End FireStarter

import { HttpClientModule } from '@angular/common/http'
// Auth
import { AuthModule } from './auth/auth.module';

// Shared/Widget
import { SharedModule } from './shared/shared.module';

// Feature Modules
// Timesheets
import { TimesheetModule } from './timesheets/shared/timesheet.module';

// Projects
import { ProjectsModule } from './projects/projects.module';

// Dashboard
import { DashboardModule } from './dashboard/dashboard.module';

// Homepage
import { HomepageModule } from './homepage/homepage.module';

// Clients
import { ClientsModule } from './clients/clients.module';

// Invoices 
import { InvoicesModule } from './invoices/invoices.module';

// Managers
import { ManagerModule } from './manager/manager.module';

// Shared Ui Components
import { UiModule } from './ui/shared/ui.module';

// Environment Variables
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
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
    HomepageModule,
    InvoicesModule,
    ManagerModule,
    AngularFireModule.initializeApp(environment.firebase, 'firestarter'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [AppConfigService],
  bootstrap: [
    AppComponent,
  ],
  entryComponents: []
})
export class AppModule { }
