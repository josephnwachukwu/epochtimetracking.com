// User Model
import { Agency } from './agency.model' 

export class User {
  // User ID 
  uid?: string;
  // General User Information
  email?: string | null;
  photoURL?: string;
  userName?: string;
  firstName?:string;
  lastName?:string;
  position?:string;
  isAdmin?:boolean;
  manager?:string;
  employment?:string;
  company?:string;

  // Manager Information
  manger?:string;
  managerEmail?:string;

  //Agency Information
  isThroughAgency?:boolean;
  agency?:any;
  constructor() {
    this.agency = Object.assign({}, new Agency())
  }
}