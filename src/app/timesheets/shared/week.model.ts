import { Day } from './day.model'

// Week Model
export class Week {
	monday:any
	tuesday:any
	wednesday:any
	thursday:any
	friday:any
	saturday:any
	sunday:any
	constructor() {
    let d = new Day()
    let temp = Object.assign({}, d)
    this.monday = {...temp};
    this.tuesday = {...temp};
    this.wednesday = {...temp};
    this.thursday = {...temp};
    this.friday = {...temp};
    this.saturday = {...temp};
    this.sunday = {...temp};
  }
}
