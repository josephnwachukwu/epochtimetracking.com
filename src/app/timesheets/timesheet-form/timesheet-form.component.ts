import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Timesheet } from '../shared/timesheet';
import { Project } from '../../projects/project-model';
import { Client } from '../../clients/client-model'

import { TimesheetService } from '../shared/timesheet.service';
import { ProjectService } from '../../projects/project.service';
import { ClientService } from '../../clients/client.service';

import { Observable } from 'rxjs';
import { WorkWeek } from '../shared/workweek.model'

import { AuthService } from '../../core/auth.service'
//import { flatMap } from 'rxjs'

@Component({
  selector: 'timesheet-form',
  templateUrl: './timesheet-form.component.html',
  styleUrls: ['./timesheet-form.component.scss'],
})

export class TimesheetFormComponent implements OnInit {
  @Input() timesheet:any;
  projectsList:any[] = []
  // timesheet: Timesheet = new Timesheet();

  projects: Observable<Project[]>;

  clients: Observable<Client[]>;
  projectslist:any[]
  clientsList:any[]

  constructor(private timesheetSvc: TimesheetService, private projectService: ProjectService, private clientService: ClientService, private authService: AuthService) {

  }
  ngOnInit() {
    this.projects = this.projectService.getSnapshot();
    this.projects
      .subscribe(
        (data) => {
          this.projectsList = (data)
        }
      )

    this.clients = this.clientService.getSnapshot();
    this.clients
      .subscribe(
        (data) => {
          this.clientsList = (data)
        }
      )
  }
  createTimesheet() {
    //this.timesheet.uid = this.authService.userData.uid;
    this.timesheetSvc.createTimesheet(this.timesheet);
    this.timesheet.date = null;
    this.timesheet = new Timesheet(); // reset item
  }
  setDate() {

  }
  addProject() {
  	let wk = new WorkWeek()
    let temp = Object.assign({}, wk)
  	this.timesheet.projects.push({...temp})
  }
  calculateHours = (project:any) => {
    let hours = 0
    Object.keys(project.week).map(function(key,index) {
      if(parseInt(project.week[key].hours) < 24 && parseInt(project.week[key].hours) > 0) {
        hours += parseInt(project.week[key].hours)
      }
    })
    project.total = hours;
  }
}
