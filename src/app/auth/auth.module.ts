import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Services
import { AuthService } from './auth.service';
import { NotifyService } from './shared/notifications/notify.service';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationMessageComponent } from './shared/notifications/notification-message/notification-message.component';
import { LoginFormComponent } from './forms/login/login-form.component';
import { RegisterFormComponent } from './forms/register/register-form.component';
import { AdminComponent } from './admin/admin.component';

import { AuthRoutingModule } from './auth.routes';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AuthRoutingModule,
  ],
  providers: [AuthService, NotifyService],
  declarations: [
  	RegisterComponent,
  	LoginComponent,
    ProfileComponent,
    NotificationMessageComponent,
    LoginFormComponent,
    RegisterFormComponent,
    AdminComponent,
  ],
  exports: [
  	RegisterComponent,
  	LoginComponent,
    ProfileComponent,
    NotificationMessageComponent,
    LoginFormComponent,
    RegisterFormComponent,
    AdminComponent,
  ]
})
export class AuthModule { }
