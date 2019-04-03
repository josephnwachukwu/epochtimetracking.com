import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Client } from '../clients/client.model';
import { AuthService } from '../core/auth.service';

@Injectable()
export class ClientService {

  clientsCollection: AngularFirestoreCollection<any>;
  noteDocument:   AngularFirestoreDocument<any>;
  userData:any;

  constructor(private afs: AngularFirestore, private authService: AuthService, public afAuth: AngularFireAuth) {
    this.clientsCollection = this.afs.collection('clients', (ref) => ref.orderBy('id', 'desc').limit(5));
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        console.log('user is logged in');
        this.userData = res;
        this.clientsCollection = this.afs.collection('timesheets', (ref) => ref.where('uid', '==', this.userData.uid))
        console.log('this.userData',this.userData);
      } else {
        console.log('user not logged in');
      }
    });
  }

  getData(): Observable<any[]> {
    // ['added', 'modified', 'removed']
    return this.clientsCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getClient(id: string) {
    return this.afs.doc<any>(`clients/${id}`);
  }

  createClient(client: Client) {
    client.id = this.userData.uid;
    return this.clientsCollection.add(Object.assign({}, client));
  }

  updateClient(id: string, data: Client) {
    return this.getClient(id).update(data);
  }

  deleteClient(id: string) {
    return this.getClient(id).delete();
  }
}