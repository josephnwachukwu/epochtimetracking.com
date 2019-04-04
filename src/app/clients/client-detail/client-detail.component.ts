import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

// Firebase
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

// RxJs
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Services
import { ClientService } from '../client.service';

// Models
import { Client } from '../client.model';

@Component({
  selector: 'client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
})

export class ClientDetailComponent implements OnInit {
  id:string;
  private clientDocument: AngularFirestoreDocument<Client>;
  client: Observable<Client>;

  constructor(private clientService: ClientService, private route: ActivatedRoute, private afs: AngularFirestore) { 
  	
  }

  ngOnInit() {
  	var clientId = this.route.snapshot.paramMap.get("id");
  	this.clientDocument = this.afs.doc<Client>('clients/' + clientId)
  	this.client = this.clientDocument.valueChanges()
  }

  deleteClient(id: string) {
    this.clientService.deleteClient(id);
  }

  getClient(id: string) {
    return this.afs.doc<Client>(`clients/${id}`);
  }

}
