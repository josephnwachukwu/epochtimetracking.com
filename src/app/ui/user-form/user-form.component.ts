import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../core/auth.service';

type UserFields = 'email' | 'password' | 'firstName' | 'lastName' | 'userName' | 'employment' | 'agreeToTerms' | 'company';
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup;
  returningUserForm: FormGroup;
  newUser = true; // to toggle login or signup form
  passReset = false; // set to true when password reset is triggered
  formErrors: FormErrors = {
    'email': '',
    'password': '',
    'firstName': '',
    'lastName': '',
    'userName': '',
    'employment': '',
    'company': '',
    'agreeToTerms': ''
  };
  validationMessages = {
    'email': {
      'required': 'Email is required.',
      'email': 'Email must be a valid email',
    },
    'password': {
      'required': 'Password is required.',
      'pattern': 'Password must be include at one letter and one number.',
      'minlength': 'Password must be at least 4 characters long.',
      'maxlength': 'Password cannot be more than 40 characters long.',
    },
    'firstName': {
      'required': 'First Name is required.',
      'minlength': 'First Name must be at least 2 characters long.',
    },
    'lastName': {
      'required': 'Last Name is required.',
      'minlength': 'Last Name must be at least 2 characters long.',
    },
    'userName': {
      'required': 'Username is required.',
      'minlength': 'Username Name must be at least 2 characters long.',
    },
    'employment': {
      'required': 'Username is required.',
    },
    'agreeToTerms': {
      'required': 'You must agree to the terms before signing up.',
    },
    'company': {
      'required': 'You must type a company to proceed'
    }
  };



  constructor(private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit() {
    this.buildForm();
  }

  toggleForm() {
    this.newUser = !this.newUser;
  }

  signup() {
    this.auth.emailSignUp(this.userForm.value['email'], this.userForm.value['password'], this.userForm.value['firstName'], this.userForm.value['lastName'], this.userForm.value['userName'], this.userForm.value['employment'], this.userForm.value['agreeToTerms']);
  }

  login() {
    this.auth.emailLogin(this.returningUserForm.value['email'], this.returningUserForm.value['password']);
  }

  resetPassword() {
    this.auth.resetPassword(this.userForm.value['email'])
      .then(() => this.passReset = true);
  }

  buildForm() {
    this.userForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email,
      ]],
      'password': ['', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
      ]],
      'firstName': ['', [
        Validators.minLength(2),
      ]],
      'lastName': ['', [
        Validators.minLength(2),
      ]],
      'userName': ['', [
        Validators.minLength(2),
      ]],
      'employment': ['', [
        Validators.required,
      ]],
      'agreeToTerms': ['', [
        Validators.required,
      ]]
    });

    this.returningUserForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email,
      ]],
      'password': ['', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
      ]],
      'company':  ['', [
        Validators.required,
      ]]
    })

    this.userForm.valueChanges.subscribe((data) => this.onValueChanged(data));
    this.returningUserForm.valueChanges.subscribe((data) => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }

  // Updates validation state on form changes.
  onValueChanged(data?: any) {
    if (!this.userForm) { return; }
    if (!this.returningUserForm) { return; }
    const form = this.userForm;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field) && (field === 'email' || field === 'password' || field === 'firstName' || field ===
        'lastName' || field === 'userName' || field === 'employment' || field === 'agreeToTerms')) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          if (control.errors) {
            for (const key in control.errors) {
              if (Object.prototype.hasOwnProperty.call(control.errors, key) ) {
                this.formErrors[field] += `${(messages as {[key: string]: string})[key]} `;
              }
            }
          }
        }
      }
    }
  }
}
