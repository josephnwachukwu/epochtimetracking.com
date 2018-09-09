import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

///// Start FireStarter

// Core
import { CoreModule } from './core/core.module';

// Shared/Widget
import { SharedModule } from './shared/shared.module';

// Feature Modules
// import { ItemModule } from './items/shared/item.module';
import { TimesheetModule } from './timesheets/shared/timesheet.module';

import { UploadModule } from './uploads/shared/upload.module';
import { UiModule } from './ui/shared/ui.module';
// import { NotesModule } from './notes/notes.module';
import { ProjectsModule } from './projects/projects.module';
import { ClientsModule } from './clients/clients.module';
///// End FireStarter

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

// Directives
//import { HoursMaskDirective } from './shared/directives/hours-mask.directive';
//import { NumbersOnlyDirective } from './shared/directives/numbersOnly.directive'


@NgModule({
  declarations: [
    AppComponent,
    //HoursMaskDirective,
    //NumbersOnlyDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    // ItemModule,
    UiModule,
    // NotesModule,
    ProjectsModule,
    ClientsModule,
    TimesheetModule,

    BrowserAnimationsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatInputModule,
    MatNativeDateModule,
    MatFormFieldModule,
    AngularFireModule.initializeApp(environment.firebase, 'firestarter'),
  ],
  bootstrap: [
    AppComponent,
  ],
  entryComponents: [
    StartDateComponent
  ]
})
export class AppModule { }
