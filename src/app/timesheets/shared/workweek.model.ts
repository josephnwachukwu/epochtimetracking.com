import { Week } from './week.model'

export class WorkWeek {
	initiative:string;
	client:string;
	week:any;
	total:number;
	constructor() {
		let wk = new Week()
    let temp = Object.assign({}, wk)
		this.week = temp;
		this.total = 0;
	}
}
