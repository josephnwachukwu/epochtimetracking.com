import { Component, OnInit } from '@angular/core';
import { Client } from '../client.model'
import { ClientService } from '../client.service'

@Component({
  selector: 'client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {
	client = new Client();
  constructor(public clientService: ClientService) { }

  ngOnInit() {

  }

  createClient = (client: Client) => {
  	this.clientService.createClient(client)
  }

}
