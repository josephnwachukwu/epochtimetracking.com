import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { firebase } from '@firebase/app';
import { auth } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { NotifyService } from './notify.service';

import { Observable, of } from 'rxjs';
import { switchMap, startWith, tap, filter } from 'rxjs/operators';


import { User } from '../shared/models/user.model'


@Injectable()
export class AuthService {

  user: Observable<any>;
  ///userData:any;
  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private notify: NotifyService) {

    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );

  }

 ////// OAuth Methods /////

  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  githubLogin() {
    const provider = new auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  twitterLogin() {
    const provider = new auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider: any) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(credential => {
        //this.notify.update('Welcome to Firestarter!!!', 'success');
        return this.updateUserData(credential.user);
      })
      .catch(error => this.handleError(error));
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

        // Add propterties to user object

        Object.defineProperties(user, {
          firstName: {
            value: firstName
          },
          lastName: {
            value: lastName
          },
          userName: { 
            value: userName
          },
          employment: {
            value: employment
          }
        })


        // user.firstName = firstName;
        // user.lastName = lastName;
        // user.userName = userName;
        // user.employment = employment;
        //user.agency = {}
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
    const fbAuth = auth();

    return fbAuth
      .sendPasswordResetEmail(email)
      .then(() => this.notify.update('Password update email sent', 'info'))
      .catch(error => this.handleError(error));
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
  private updateUserData(user: any) {

    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
      
    const data = {
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
    };

    return userRef.set(data);
  }

  updateUserProfile(user: User) {
    console.log('updating user', user)
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    return userRef.set(user);
  }
}
