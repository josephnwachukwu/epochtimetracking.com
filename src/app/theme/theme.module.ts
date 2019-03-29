import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Shared Module
import { SharedModule } from '../shared/shared.module';

// Components
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { StyleGuideComponent } from './style-guide/style-guide.component';
// Routes
import { ThemeRoutingModule } from './theme.routes'

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    ThemeRoutingModule,
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    StyleGuideComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    StyleGuideComponent,
  ],
})

export class ThemeModule { }