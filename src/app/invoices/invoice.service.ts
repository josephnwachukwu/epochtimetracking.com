import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Invoice } from './invoice.model'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';


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
	}


	getData = (clientId:string): Observable<Invoice[]> => {
		this.invoicesCollection = this.afs.collection('invoices', (ref) => ref.where('clientId', '==', clientId).where('userId', '==', this.userData.uid));
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
