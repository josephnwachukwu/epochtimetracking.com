//import { Project } from './projects'
import { WorkWeek } from './workweek.model'

// Enum Types
export type status = "approved" | "submitted" | "rejected" | "saved" | "draft"
export type overlapping = true | false

export class Timesheet {
	// User ID Associated with this timesheet
  	uid:string;

  	// Unique ID
  	id?: string;

  	// Title of Timesheet
	title: string;

	// Client ID 
	clientId: string;

	// Is this an overLapping timesheet where the end of the month is in the middle of the week
	overlapping:boolean;

	// Status what state the timesheet is in
	status:string;

	// When it was submitted
	time: number;

	// Comments associated with the timesheet
	body: string;

	// Name of the contractor
	userName:string;
	manager:string;
	managerEmail:string;
	userEmail:string;
	date:any;

	// This is the flag for editing
	readOnly?:boolean;

	// Has timesheet Been Invoiced
	invoiced:boolean;
	weekEnding:string;
	weekStarting:string;
	active = true;
	projects:any[];
	comments:any[];
	
	constructor() {
		let workWeek = new WorkWeek()
    	let temp = Object.assign({}, {...workWeek})
		this.projects = [];
		this.projects.push({...temp})
		this.title = "Timesheet Ending "
		this.status = "draft"
    	this.uid = ''
    	this.overlapping = false;
    	this.invoiced = false;
	}
}
