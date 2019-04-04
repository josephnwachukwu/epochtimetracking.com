import { Week } from './week.model'

export class WorkWeek {

	// Project Initiative 
	inititative:string;

	// Subtask under Initiative
	task:string;
	
	// Week of work
	week:any;

	// Total Number of hours
	total:number;
	
	constructor() {
		let wk = new Week()
    let temp = Object.assign({}, wk)
		this.week = temp;
		this.total = 0;
	}
}
