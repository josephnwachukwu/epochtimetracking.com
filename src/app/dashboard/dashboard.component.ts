import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientFormComponent } from '../clients/client-form/client-form.component';

import { ClientService }  from '../clients/client.service';

import { Client } from '../clients/client.model'

import { Observable } from 'rxjs';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('addClient')
  clients: Observable<Client[]>
  addClientModalActive:boolean = false;
  constructor(public clientService: ClientService) { 
  	console.log(this.addClientModalActive)
  }

  ngOnInit() {
  	this.addClientModalActive = false;
    this.clients = this.clientService.getData();
  }

  toggleClientModal = () => {
  	this.addClientModalActive = !this.addClientModalActive
  }

}
