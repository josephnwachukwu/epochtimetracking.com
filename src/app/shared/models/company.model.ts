// Agency Model
import { Address } from './address.model'

export class Company {
  name?:string;
  address?:any;
  phoneNumber?:string;
  taxIDType?:string;
  taxID?:string;
  
  constructor() {
    this.address = Object.assign({}, new Address())
  }
}