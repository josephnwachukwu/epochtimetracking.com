import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Client } from './client-model';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface NewNote {
  content: string;
  hearts: 0;
  time: number;
}

@Injectable()
export class ClientService {

  clientsCollection: AngularFirestoreCollection<Client>;
  clientDocument:   AngularFirestoreDocument<Node>;

  constructor(private afs: AngularFirestore) {
    this.clientsCollection = this.afs.collection('clients', (ref) => ref.orderBy('time', 'desc'));
  }

  getData(): Observable<Client[]> {
    return this.clientsCollection.valueChanges();
  }

  getSnapshot(): Observable<Client[]> {
    // ['added', 'modified', 'removed']
    return this.clientsCollection.snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.doc.data() as Client;
        return { id: a.payload.doc.id, content: data.content, time: data.time };
      });
    });
  }

  getClient(id: string) {
    return this.afs.doc<Client>(`clients/${id}`);
  }

  create(content: string) {
    const client = {
      content,
      time: new Date().getTime(),
    };
    return this.clientsCollection.add(client);
  }

  updateClient(id: string, data: Partial<Client>) {
    return this.getClient(id).update(data);
  }

  deleteClient(id: string) {
    return this.getClient(id).delete();
  }
}
