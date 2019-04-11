import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Client } from '../clients/client.model';
import { AuthService } from '../core/auth.service';

@Injectable()
export class ClientService {

  clientsCollection: AngularFirestoreCollection<any>;
  clientDocument:   AngularFirestoreDocument<any>;
  userData:any;

  constructor(private afs: AngularFirestore, private authService: AuthService, public afAuth: AngularFireAuth) {
    this.clientsCollection = this.afs.collection('clients', (ref) => ref.orderBy('clientName', 'desc'));
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        this.userData = res;
      } 
    });
  }

  getData = (): Observable<Client[]> => {
    return this.clientsCollection.snapshotChanges().pipe(
      map(actions => actions.map((snap) => {
          const data = snap.payload.doc.data() as Client;
          const id = snap.payload.doc.id;
          return { id, ...data };
        })
      )

    );
  }


  getClient(id: string) {
    return this.afs.doc<any>(`clients/${id}`);
  }

  createClient(client: any) {
    client.userId = this.userData.uid;
    client.time = new Date().getTime();
    //console.log(`client`, client)
    return this.clientsCollection.add(Object.assign({}, client));

  }

  updateClient(id: string, data: Client) {
    return this.getClient(id).update(data);
  }

  deleteClient(id: string) {
    return this.getClient(id).delete();
  }
}