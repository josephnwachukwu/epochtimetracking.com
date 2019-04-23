// User Model
import { Agency } from './agency.model' 
import { Company } from './company.model'


export type tier = 'user' | 'manager' | 'vendor';


export class User {
  // User ID 
  uid?: string;

  // General User Information
  email?: string | null;
  photoURL?: string;
  displayName?:string;
  userName?: string;
  firstName?:string;
  lastName?:string;
  isAdmin?:boolean;

  // Company Informatoin
  company?:any;
  

  //Agency Information
  isThroughAgency?:boolean;
  agency?:any;


  constructor() {
    this.agency = Object.assign({}, new Agency())
    this.company = Object.assign({}, new Company())
  }
}