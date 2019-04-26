export class Project {
  id?: string;
  name?: string;
  clientName?:string;
  clientId?:string;
  description?:string;
  time?: number;
  billable?: boolean;
  constructor() {
  	this.billable = true;
  }
}
