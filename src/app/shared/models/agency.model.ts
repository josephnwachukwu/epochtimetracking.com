// Agency Model
import { Address } from './address.model'

export class Agency {
  agencyName:string;
  address:any;
  constructor() {
    this.address = Object.assign({}, new Address())
  }
}