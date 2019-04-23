import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

//import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth'

import { Timesheet } from './timesheet.model';
import { WorkWeek } from './workweek.model'

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../../auth/auth.service'

import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Injectable()
export class TimesheetService {

  private basePath = '/timesheets';

  timesheetsCollection: AngularFirestoreCollection<any>;
  timesheetDocument: AngularFirestoreDocument<Node>;
  timesheets: Observable<any[]>;
  timesheet =  new Timesheet();
  events: string[] = [];
  dates:any[] = [];
  userData:any;

  
  constructor( private afs:AngularFirestore, private authService: AuthService, public afAuth: AngularFireAuth, public route: ActivatedRoute) {
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        console.log('hi')
        this.userData = res;
        this.timesheetsCollection = this.afs.collection('timesheets', (ref) => ref.where('uid', '==', this.userData.uid));
        
        this.timesheets = this.timesheetsCollection.snapshotChanges().pipe(
          map((arr:any[]) => {
            return arr.map((snap) => {
              const data = snap.payload.doc.data() as Timesheet;
              return {id: snap.payload.doc.id, ...data }
            })
          })
        );
      } 
    });
  }

  getData = (): Observable<Timesheet[]> => {
    // map the data from snapshot
    console.log(this.timesheetsCollection)
    return this.timesheetsCollection.snapshotChanges().pipe(
      map((arr:any[]) => {
        return arr.map((snap) => {
          const data = snap.payload.doc.data() as Timesheet;
          return {id: snap.payload.doc.id, ...data }
        })
      })
    );
  }

  getTimesheet(id: string) {
    return this.afs.doc<Timesheet>(`timesheets/${id}`)
  }

  updateTimesheet = (id: string, timesheet: Timesheet) => {
    timesheet.readOnly = true;
    return this.afs.doc<Timesheet>(`timesheets/${id}`).update(timesheet);
  }

  createTimesheet = (timesheet: Timesheet) => {
    timesheet.uid = this.userData.uid;
    timesheet.time =  new Date().getTime();
    timesheet.readOnly = true;
    return this.timesheetsCollection.add(Object.assign({},timesheet));
  }

  updateTimesheetStatus = (id: string, data: Partial<Timesheet>) => {
    //console.log('data',data)
    data['body'] = 'something';
    data['manager'] = "joseph nwachukwu";
    data['managerEmail'] = 'josephnwachukwu@gmail.com';
    data['userEmail'] = 'josephnwachukwu@gmail.com';
    data['user'] = 'josephnwachukwu';
    data['weekEnding'] = 'someting';

    return this.getTimesheet(id).update(data)
  }

  submitTimesheet = (timesheet, id) => {
    timesheet.status = 'submitted';
    return this.getTimesheet(id).update(timesheet)
  }

  // Deletes a single timesheet
  deleteTimesheet(id = <string>'') {
    console.log('deleting timesheet...', id)
    return this.getTimesheet(id).delete()
  }

  // Deletes the entire list of timesheets
  deleteAll(): void {
    //this.timesheetsRef.remove();
  }

  // Default error handling for all actions
  private handleError(error: Error) {
    console.error(error);
  }

  startingMonday = (date:any) => {
    let day = date.getDay()
    return day === 1;
  }


  setStartDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    let selectedDate:any = event.value
    this.timesheet.date = new Date(selectedDate)
    let titleDate = new Date(selectedDate)
    titleDate.setDate((selectedDate.getDate() + 4))
    this.timesheet.title += ' ' + titleDate.toDateString();
    this.timesheet.weekStarting = this.timesheet.date;
    this.timesheet.weekEnding = titleDate.toDateString()
    Object.keys(this.timesheet.projects[0].week).map((key, index) => {
      //console.log('key ', key)
      let tempDate = new Date(selectedDate);
      tempDate.setDate(tempDate.getDate() + index)
      this.timesheet.projects[0].week[key].day = tempDate.toDateString()
    })
  }

  ConvertToCSV2 = (ts:Timesheet): void => {
      let titleStr:string;
      let preStr:string;
      let str:string ='';

      titleStr = ts.title + '\r\n';

      preStr = 'Project,Task,';

      preStr += ts.projects[0].week.monday.day + ',';
      preStr += ts.projects[0].week.tuesday.day + ',';
      preStr += ts.projects[0].week.wednesday.day + ',';
      preStr += ts.projects[0].week.thursday.day + ',';
      preStr += ts.projects[0].week.friday.day + ',';
      preStr += ts.projects[0].week.saturday.day + ',';
      preStr += ts.projects[0].week.sunday.day + ',';
      preStr += 'Total Hours'
      preStr += '\r\n';

      for(let i in ts.projects) {
        str += ts.projects[i].initiative.name + ',';
        str += ts.projects[i].task + ',';
        str += ts.projects[i].week.monday.hours + ',';
        str += ts.projects[i].week.tuesday.hours + ',';
        str += ts.projects[i].week.wednesday.hours + ',';
        str += ts.projects[i].week.thursday.hours + ',';
        str += ts.projects[i].week.friday.hours + ',';
        str += ts.projects[i].week.saturday.hours + ',';
        str += ts.projects[i].week.sunday.hours + ',';
        str += ts.projects[i].total
        str += '\r\n';
      }

      let finalStr = titleStr + preStr + str;

      // Download Excel Document
      window.open( "data:text/csv;charset=utf-8," + encodeURIComponent(finalStr));
      this.runReport()
    }

    removeProject(index:number) {
      this.timesheet.projects.splice(index, 1);
    }

    onExportClick() {
      console.log(this.timesheet);
    }

    runReport():void {

    }
}
