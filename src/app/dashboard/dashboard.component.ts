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

  clients: Observable<any[]>

  addClientModalActive:boolean = false;
  constructor(public clientService: ClientService) { 

  }

  ngOnInit() {
  	this.addClientModalActive = false;
    this.clients = this.clientService.getData();
  }

  toggleClientModal = () => {
  	this.addClientModalActive = !this.addClientModalActive
  }

  notifyMe = () => {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      console.log("This browser does not support system notifications");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      var notification = new Notification("Hi there!");
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var notification = new Notification("Hi there!");
        }
      });
    }

    // Finally, if the user has denied notifications and you 
    // want to be respectful there is no need to bother them any more.
  }

}
