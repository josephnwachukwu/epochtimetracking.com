import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';

@NgModule({
  imports: [
    CommonModule,
    HomepageRoutingModule
  ],
  declarations: [
  	LandingPageComponent
  ],
  exports: [
  	LandingPageComponent
  ]
})

export class HomepageModule { }
