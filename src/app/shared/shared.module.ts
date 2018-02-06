import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingSpinnerComponent } from '../ui/loading-spinner/loading-spinner.component';

// Directives
import { HoursMaskDirective } from './directives/hours-mask.directive'
import { NumbersOnlyDirective } from './directives/numbersOnly.directive'

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule,
        MatDialogModule,
        MatInputModule,
        MatNativeDateModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatInputModule,
    MatNativeDateModule,
  ],
  declarations: [
    LoadingSpinnerComponent,
    HoursMaskDirective,
    NumbersOnlyDirective,
  ],
  exports: [
    LoadingSpinnerComponent,
    MatDatepickerModule,
        MatDialogModule,
        MatInputModule,
        MatNativeDateModule,
    HoursMaskDirective,
    NumbersOnlyDirective,
  ],
})
export class SharedModule { }
