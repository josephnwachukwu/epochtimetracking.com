import { Component, Input } from '@angular/core';

import { ClientService } from '../client.service';

import { Client } from '../client.model';

@Component({
  selector: 'client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
})
export class ClientDetailComponent {

  @Input()
  client: Client;

  constructor(private clientService: ClientService) { }

  deleteClient(id: string) {
    this.clientService.deleteClient(id);
  }

}
