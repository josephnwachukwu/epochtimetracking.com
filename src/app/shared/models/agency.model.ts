// Agency Model
import { Address } from './address.model'

export class Agency {
  name?:string;
  address?:any;
  phoneNumber?:string;
  contactName?:string;
  contactEmail?:string;
  contactVerified?:boolean;
  rate?:string;
  
  constructor() {
    this.address = Object.assign({}, new Address())
    this.contactVerified = false;
  }
}