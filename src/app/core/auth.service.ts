import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { NotifyService } from './notify.service';

import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';

export class Address {
  addressLine1:string;
  addressLine2:string;
  city:string;
  state:string;
  zipcode:string;
  constructor() {}
}

export class Agency {
  agencyName:string;
  address:any;
  constructor() {
    this.address = Object.assign({}, new Address())
  }
  //address: new Address()
}

export class User {
  uid: string;
  email?: string | null;
  photoURL?: string;
  userName?: string;
  firstName?:string;
  lastName?:string;
  position?:string;
  isAdmin?:boolean;
  manager?:string;
  employment?:string;
  company?:string;
  manger?:string;
  managerEmail?:string;

  //Agency Information
  isThroughAgency?:boolean;
  agency?:any;
  constructor() {
    this.agency = Object.assign({}, new Agency())
  }
}

@Injectable()
export class AuthService {

  user: Observable<User | null>;
  userData:any;
  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private notify: NotifyService) {

    this.user = this.afAuth.authState
      .switchMap((user) => {
        if (user) {
          //this.userData = this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          //console.log('ud',this.userData)
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      });

    //this.user.subscribe(
    //  (data) => {
    //    this.userData = data;
    //    console.log('user Data', this.userData)
    //  }
    //).unsubscribe()
    //this.user.unsubscribe();
  }

  ////// OAuth Methods /////

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider: firebase.auth.AuthProvider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.notify.update('Welcome back to Epoch', 'success');
        return this.updateUserData(credential.user);
      })
      .catch((error) => this.handleError(error) );
  }

  //// Anonymous Auth ////

  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously()
      .then((user) => {
        this.notify.update('Welcome to Epoch!!!', 'success');
        return this.updateUserData(user); // if using firestore
      })
      .catch((error) => {
        console.error(error.code);
        console.error(error.message);
        this.handleError(error);
      });
  }

  //// Email/Password Auth ////

  emailSignUp(email: string, password: string, firstName: string, lastName: string, userName: string, employment:string, agreeToTerms:boolean) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log('employment', employment)
        user.firstName = firstName;
        user.lastName = lastName;
        user.userName = userName;
        user.employment = employment;
        user.agency = {}
        //user.add()
        //user.agency = Object.assign({}, new Agency())
        //this.notify.update('Welcome to Epoch!!!', 'success');
        return this.updateUserData(user); // if using firestore
      })
      .catch((error) => this.handleError(error) );
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        //this.notify.update('Welcome to Epoch!!!', 'success')
        //user.add(Object.assign({}, new Agency()))
        return this.updateUserData(user); // if using firestore
      })
      .catch((error) => this.handleError(error) );
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth.sendPasswordResetEmail(email)
      .then(() => this.notify.update('Password update email sent', 'info'))
      .catch((error) => this.handleError(error));
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/']);
    });
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    this.notify.update(error.message, 'error');
  }

  // Sets user data to firestore after succesful login
  private updateUserData(user: User) {

    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email || null,
      userName: user.userName || 'New Member',
      photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ',
      firstName: user.firstName || 'first Name',
      lastName: user.lastName || 'last Name',
      position: user.position || 'Position Not Set!',
      manager: user.manager || 'Manager Not Set',
      isAdmin: user.isAdmin || false,
      employment: user.employment || 'Not Set',
      agency: Object.assign({}, new Agency())
    };
    //data.add(Object.assign({}, new Agency()));
    return userRef.set(data);
  }

  updateUserProfile(user: User) {
    console.log('updating user', user)
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    return userRef.set(user);
  }
}
