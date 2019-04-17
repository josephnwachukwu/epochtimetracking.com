import { Component, Input, OnInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";


// Firebase
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

// RxJs
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Services
import { ClientService } from '../client.service';
import { TimesheetService } from '../../timesheets/shared/timesheet.service';
import { ProjectService } from '../../projects/project.service';

import { TimesheetDetailModalComponent } from '../../timesheets/timesheet-detail-modal/timesheet-detail-modal.component'
import { TimesheetEditComponent } from '../../timesheets/timesheet-edit/timesheet-edit.component';
// Models
import { Client } from '../client.model';



@Component({
  selector: 'client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
  providers: [TimesheetService]
})

export class ClientDetailComponent implements OnInit, AfterContentInit {
  id:string;
  activePanel: string;
  private clientDocument: AngularFirestoreDocument<Client>;
  client: Observable<Client>;
  clientId: string;
  // Lists
  timesheets: Observable<any[]>;
  projects: Observable<any[]>;
  expenses: Observable<any[]>;
  invoices: Observable<any[]>;
  reports: Observable<any[]>;
  tasks: Observable<any[]>;

  timesheetModalActive: boolean = false;
  constructor(private clientService: ClientService, private route: ActivatedRoute, private afs: AngularFirestore, public timesheetService: TimesheetService ) { 
  	
  }

  ngOnInit() {
  	this.clientId = this.route.snapshot.paramMap.get("id");
  	this.clientDocument = this.afs.doc<Client>('clients/' + this.clientId)
  	this.client = this.clientDocument.valueChanges();
  	this.activePanel = 'summary';

  	// Get Lists
  	
  	// this.projects = this.projectsService.getData();
  	// this.expenses = this.expensesService.getData();
  	// this.invoices = this.invoicesService.getData();
  	// this.reports = this.reportsService.getData();
  }

  ngAfterContentInit() {
  	//this.timesheets = this.timesheetService.getData();
  }

  deleteClient(id: string) {
    this.clientService.deleteClient(id);
  }

  getClient(id: string) {
    return this.afs.doc<Client>(`clients/${id}`);
  }

  getTimesheets() {

  }

  deleteTimesheet = (id:string) => {
    this.timesheetService.deleteTimesheet(id)
  }

  toggleModal = () => {
  	this.timesheetModalActive = !this.timesheetModalActive
  }

  submitTimesheet = (timesheet:any, id:string) => {
    this.timesheetService.submitTimesheet(timesheet, id);
  }

}
