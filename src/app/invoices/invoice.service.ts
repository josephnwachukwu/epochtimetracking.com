import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { Invoice } from './invoice.model'

@Injectable()
export class InvoiceService {

	invoicesCollection: AngularFirestoreCollection<any>;
	invoiceDocument:   AngularFirestoreDocument<any>;
	userData:any;
	invoices:Observable<any[]>;

	constructor(private afs: AngularFirestore, private authService: AuthService, public afAuth: AngularFireAuth) {
		
	    this.afAuth.authState.subscribe(res => {
	      if (res && res.uid) {
	        this.userData = res;
	      } 
	    });

	 //    this.invoices = this.invoicesCollection.snapshotChanges()
		// .pipe(
		//   map(actions => actions.map((snap) => {
		//       const data = snap.payload.doc.data() as Invoice;
		//       const id = snap.payload.doc.id;
		//       return { id, ...data };
		//     })
		//   )
		// );
	}


	getData = (): Observable<Invoice[]> => {
		console.log('is it working')
		this.invoicesCollection = this.afs.collection('invoices', (ref) => ref.orderBy('date', 'desc'));
		return this.invoicesCollection.snapshotChanges().pipe(
			map((actions:any[]) => {
		        return actions.map((a) => {
		          const data = a.payload.doc.data() as Invoice;
		          return { id: a.payload.doc.id, ...data };
		        });
		    })
		)
	}

	getInvoice(id: string) {
		return this.afs.doc<Invoice>(`invoices/${id}`);
	}

	createInvoice(invoice: any) {
		return this.invoicesCollection.add(Object.assign({}, invoice));
	}

	deleteInvoice(id: string) {
    return this.getInvoice(id).delete();
  }
}
