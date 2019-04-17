import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { Timesheet } from '../shared/timesheet.model';
import { Project } from '../../projects/project-model';
import { Client } from '../../clients/client.model'

import { TimesheetService } from '../shared/timesheet.service';
import { ProjectService } from '../../projects/project.service';
import { ClientService } from '../../clients/client.service';

import { Observable } from 'rxjs';
import { WorkWeek } from '../shared/workweek.model'


// Auth
import { AuthService } from '../../core/auth.service'

//Modal
import { StartDateComponent } from '../../timesheets/shared/components/start-date/start-date.component'

@Component({
  selector: 'timesheet-edit',
  templateUrl: './timesheet-edit.component.html',
  styleUrls: ['./timesheet-edit.component.scss'],
})

export class TimesheetEditComponent implements OnInit {

  // Client ID for reference
  @Input() clientId: string;
  @Input() timesheet;

  // Projects for select box
  projectsList: any[];
  //plist: Observable<any>;
  // Flag to show timesheet
  newActive: boolean = false;

  maxHoursExceeded: boolean = false;

  // Errors
  errors:any  = {
   other: {
     maxHoursExceeded: false
   },
   monday: {
     maxHoursExeeded: false
   },
   tuesday: {
     maxHoursExeeded: false
   },
   wednesday: {
     maxHoursExeeded: false
   },
   thursday: {
     maxHoursExeeded: false
   },
   friday: {
     maxHoursExeeded: false
   },
   saturday: {
     maxHoursExeeded: false
   },
   sunday: {
     maxHoursExeeded: false
   },
  };



  constructor(public timesheetSvc: TimesheetService, private projectService: ProjectService, private clientService: ClientService, private authService: AuthService, public dialog: MatDialog) {

  }
  ngOnInit() {
    this.projectService.getSnapshot(this.clientId)
    .subscribe(data => {
      this.projectsList = data;
    })

    //this.timesheet = this.timesheetSvc.getTimesheet(this.timesheet.id)
  }

  // Create Timesheet
  createTimesheet() {
    //this.timesheet.clientId = this.clientId;
    this.timesheetSvc.createTimesheet(this.timesheet);
    this.newActive = false;
  }


  // Cancel add timesheet
  cancel = () => {
    this.timesheet = new Timesheet()
    this.newActive = false;
  }

  // Push new project onto the array
  addProject() {
  	let wk = new WorkWeek()
    let temp = Object.assign({}, wk)
  	this.timesheet.projects.push({...temp})
  }

  // Calculates total hours for a project
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

  // Calculates total hours for a day
  sumEachDay = (timesheet, key) => {
    let sum = 0;
    for(let i in timesheet.projects) {
      sum += parseInt(timesheet.projects[i].week[key].hours);
    }
    if(sum > 24) {
      this.maxHoursExceeded = true;
      this.errors[key].maxHoursExceeded = true;
    }
    else {
      this.maxHoursExceeded = false;
      this.errors[key].maxHoursExceeded = false;
    }
    //console.log('te', this.errors)
    return sum
  }

  // Converts Integers to Hours
  convertTime = (num) => {
    let hours = ('0' + Math.floor(num)).slice(-2);
    let mins = ('0' + ((num % 1) * 60)).slice(-2);
    return `${hours}:${mins}:00`;
  }

  // Delete Project
  deleteProject = (timesheet, index) => {
    timesheet.projects.splice(index, 1)
  }

  // Update Timesheet
  update = (id, timesheet) => {
    this.timesheetSvc.updateTimesheet(id, timesheet)
  }

  // TODO: keep temp object and restore 
  cancelUpdate = (timesheet) => {
    timesheet.readOnly  = true;
  }

  totalSum = (timesheet) => {

    let sum = 0;
    for(let i in timesheet.projects) {
      sum += parseInt(timesheet.projects[i].total)
    }
    return sum
  }

  // Opens Modal to pick date
  openDialog(): void {
    let dialogRef = this.dialog.open(StartDateComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
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
      this.newActive = true;
    });
    
  }
}
