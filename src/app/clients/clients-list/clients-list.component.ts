import { Component, OnInit } from '@angular/core';

import { ClientService } from '../client.service';
import { Client } from '../client.model';

import { Observable } from 'rxjs';

import { AuthService } from '../../core/auth.service'

@Component({
  selector: 'clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss'],
})
export class ClientsListComponent implements OnInit {

  clients: Observable<any[]>;
  content: Client;

  constructor(private clientService: ClientService, public auth: AuthService) { }

  ngOnInit() {
    this.clients = this.clientService.getData();
    this.clients.subscribe((x:any) => {

    });
  }

  createClient() {
    this.clientService.createClient(this.content);
  }

}
