import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth'

import { Timesheet } from './timesheet';
import { WorkWeek } from './workweek.model'

import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../core/auth.service'

import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Injectable()
export class TimesheetService {

  private basePath = '/timesheets';

  timesheetsRef: AngularFireList<Timesheet>;
  timesheetRef:  AngularFireObject<Timesheet>;
  timesheetsCollection: AngularFirestoreCollection<Timesheet>;
  timesheetDocument: AngularFirestoreDocument<Node>;

  timesheet =  new Timesheet();
  events: string[] = [];
  dates:any[] = [];
  userData:any;
  constructor(private db: AngularFireDatabase, private afs:AngularFirestore, private authService: AuthService, public afAuth: AngularFireAuth) {
    this.timesheetsRef = db.list('/timesheets');
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        console.log('user is logged in');
        this.userData = res;
        this.timesheetsCollection = this.afs.collection('timesheets', (ref) => ref.where('uid', '==', this.userData.uid))
        console.log('this.userData',this.userData);
      } else {
        console.log('user not logged in');
      }
    });
  }

  // Return an observable list of Items
  getItemsList =  (): Observable<Timesheet[]> => {
    return this.timesheetsCollection.snapshotChanges().map((arr) => {
      return arr.map((snap) => {
        const data = snap.payload.doc.data() as Timesheet;
        return {
          id: snap.payload.doc.id,
          title: data.title,
          status: data.status,
          projects: data.projects,
          body: data.body,
          user: data.user,
          active: data.active,
          manager: data.manager,
          overlapping: data.overlapping,
          managerEmail: data.managerEmail,
          userEmail: data.userEmail,
          weekEnding: data.weekEnding,
          weekStarting: data.weekStarting,
          date: data.date,
          uid: data.uid,
        }
      });
      //Object.assign(snap.payload.doc.data() as Timesheet, { $key: snap.key }) );
    })
  }

  // Return a single observable timesheet
  //getTimesheet(key: string): Observable<Timesheet | null> {
  //  const timesheetPath = `${this.basePath}/${key}`;
  //  const timesheet = this.db.object(timesheetPath).valueChanges() as Observable<Timesheet | null>;
  //  return timesheet;
  //}

  getTimesheet(id: string) {
    return this.afs.doc<Timesheet>(`timesheets/${id}`)
  }

  // Create a brand new timesheet
  //createTimesheet(timesheet: Timesheet): void {
  //  this.timesheetsRef.push(timesheet);
  //}

  createTimesheet = (timesheet: Timesheet) => {
    timesheet.uid = this.userData.uid;
    return this.timesheetsCollection.add(Object.assign({},timesheet));
    //this.timesheet = null;
    //this.timesheet = new Timesheet();
    //timesheet.date = null;
  }

  // Update an exisiting timesheet
  updateTimesheet(key: string, value: any): void {
    this.timesheetsRef.update(key, value);
  }

  updateTimesheetStatus = (id: string, data: Partial<Timesheet>) => {
    console.log('data',data)
    data['body'] = 'something';
    data['manager'] = "joseph nwachukwu";
    data['managerEmail'] = 'josephnwachukwu@gmail.com';
    data['userEmail'] = 'josephnwachukwu@gmail.com';
    data['user'] = 'josephnwachukwu';
    data['weekEnding'] = 'someting';

    return this.getTimesheet(id).update(data)
  }



  // Deletes a single timesheet
  deleteTimesheet(id = <string>'') {
    console.log('deleting timesheet...', id)
    return this.getTimesheet(id).delete()
  }

  // Deletes the entire list of timesheets
  deleteAll(): void {
    this.timesheetsRef.remove();
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
      console.log('key ', key)
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

      preStr = 'Inititative,Cient,';

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
        str += ts.projects[i].initiative + ',';
        str += ts.projects[i].client + ',';
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
      // let totalHours:number = 0
      // let projectHours:number
      // let projectTiming:any = []
      // let projectName:string
      // for(let i in this.timesheet) {
      //   projectName = this.timesheet[i].initiative
      //   projectHours = 0
      //   for(let j in this.timesheet[i].days)  {
      //     totalHours += this.timesheet[i].days[j].time
      //     projectHours += this.timesheet[i].days[j].time
      //   }
      //   projectTiming.push({
      //     'projectName': projectName,
      //     'projectHours': projectHours,
      //     'totalHours': 0,
      //     'percentage': 0,
      //   })
      //   console.log(projectTiming)
      // }
      // for(let k in projectTiming) {
      //   projectTiming[k].totalHours = totalHours
      //   projectTiming[k].percentage = ((projectTiming[k].projectHours / totalHours) *100).toFixed()
      // }
    }
}
