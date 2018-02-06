import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userProfileForm: FormGroup;
  user: any;
  constructor(public auth: AuthService, private fb: FormBuilder) {
    this.auth.user.subscribe(
      (data) => {
        console.log(data);
        this.user = data;
      }
    )
    console.log('auth', auth.user)
  }

  logout() {
    this.auth.signOut();
  }

  ngOnInit() {
    //this.buildForm();
  }

  updateUserProfile = (user:any) => {
    console.log("updating user", user);
    this.auth.updateUserProfile(user);
  }

  //buildForm = () => {
  //  this.userProfileForm = this.fb.group({
  //    firstName: this.auth.user.firstName | ''
  //  })
  //}
}
