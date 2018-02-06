//import { Project } from './projects'
import { WorkWeek } from './workweek.model'

// Enum Types
export type status = "approved" | "submitted" | "rejected" | "saved" | "draft"
export type overlapping = true | false

export class Timesheet {
  uid:string;
  id?: string;
	title: string;
	body: string;
	user:string;
	manager:string;
	managerEmail:string;
	userEmail:string;
	date:any;
	status:string;
	overlapping:boolean;
	weekEnding:string;
	weekStarting:string;
	active = true;
	projects:any[];

	constructor() {

		let workWeek = new WorkWeek()
    let temp = Object.assign({}, {...workWeek})
		this.projects = [];
		this.projects.push({...temp})
		this.title = "Timesheet Ending "
		this.status = "draft"
    this.uid = ''
    this.overlapping = false
	}
}
