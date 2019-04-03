import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientFormComponent } from '../clients/client-form/client-form.component';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('addClient')

  addClientModalActive:boolean = false;
  constructor() { 
  	console.log(this.addClientModalActive)
  }

  ngOnInit() {
  	this.addClientModalActive = false;
  }

  toggleClientModal = () => {
  	this.addClientModalActive = !this.addClientModalActive
  }

}
