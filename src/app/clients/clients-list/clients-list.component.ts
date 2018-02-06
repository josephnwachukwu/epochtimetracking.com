import { Component, OnInit } from '@angular/core';

import { ClientService } from '../client.service';

import { Client } from '../client-model';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss'],
})
export class ClientsListComponent implements OnInit {

  clients: Observable<Client[]>;
  content: string;

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    // this.notes = this.noteService.getData()
    this.clients = this.clientService.getSnapshot();
  }

  createClient() {
    this.clientService.create(this.content);
    this.content = '';
  }

}
