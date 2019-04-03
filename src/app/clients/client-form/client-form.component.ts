import { Component, OnInit } from '@angular/core';
import { Client } from '../client.model'

@Component({
  selector: 'client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {
	client = new Client();
  constructor() { }

  ngOnInit() {

  }

}
