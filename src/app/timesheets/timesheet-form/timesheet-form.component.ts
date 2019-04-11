import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { Timesheet } from '../shared/timesheet';
import { Project } from '../../projects/project-model';
import { Client } from '../../clients/client.model'

import { TimesheetService } from '../shared/timesheet.service';
import { ProjectService } from '../../projects/project.service';
import { ClientService } from '../../clients/client.service';

import { Observable } from 'rxjs';
import { WorkWeek } from '../shared/workweek.model'

import { AuthService } from '../../core/auth.service'
//import { flatMap } from 'rxjs'

import { StartDateComponent } from '../../timesheets/shared/components/start-date/start-date.component'
@Component({
  selector: 'timesheet-form',
  templateUrl: './timesheet-form.component.html',
  styleUrls: ['./timesheet-form.component.scss'],
})

export class TimesheetFormComponent implements OnInit {
  @Input() clientId: string;
  projectsList: any[];
  timesheet: Timesheet;

  projects: Observable<Project[]>;
  
  //clients: Observable<Client[]>;

  //projectsList:any[]
  //clientsList:any[]
  //timesheet: any = new Timesheet();
  constructor(public timesheetSvc: TimesheetService, private projectService: ProjectService, private clientService: ClientService, private authService: AuthService, public dialog: MatDialog) {
    //this.timesheet = this.timesheetSvc.timesheet;
  }
  ngOnInit() {
    this.projectService.getSnapshot(this.clientId)
    .subscribe(data => {
      //console.log(data);
      this.projectsList = data;
    })
  }

  createTimesheet() {
    //this.timesheet.uid = this.authService.userData.uid;
    //this.timesheetSvc.createTimesheet(this.timesheet);
    //this.timesheet.date = null;
    //this.timesheet = new Timesheet(); // reset item
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

  setProject = (proj) => {
    console.log('project change ', proj)
  } 

  openDialog(): void {
    let dialogRef = this.dialog.open(StartDateComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
      this.timesheet = new Timesheet()
      let selectedDate:any = result
      this.timesheet.date = new Date(selectedDate)
      let titleDate = new Date(selectedDate)
      titleDate.setDate((selectedDate.getDate() + 4))
      this.timesheet.title += ' ' + titleDate.toDateString();
      this.timesheet.weekStarting = this.timesheet.date;
      this.timesheet.weekEnding = titleDate.toDateString()
      Object.keys(this.timesheet.projects[0].week).map((key, index) => {
        let tempDate = new Date(selectedDate);
        let month = (1 + tempDate.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        tempDate.setDate(tempDate.getDate() + index)
        let day = tempDate.getDate().toString();
        day = day.length > 1 ? day : '0' + day
        this.timesheet.projects[0].week[key].day = key.substring(0,3) + ' ' + month + '/' + day
      })
    });
  }
}
