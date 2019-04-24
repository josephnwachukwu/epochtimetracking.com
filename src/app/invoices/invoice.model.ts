import { Agency } from '../shared/models/agency.model'
import { Company } from '../shared/models/company.model'

export class Invoice {


	// Invoice name 
	name?:string;
	company?:any;
	agency?:any;

	// Client that the Invoice is for
	clientId?:string;

	// User  associated with the invoice
	userId?:string;

	// Invoice Line Items
	lineItems?:any[];

	constructor() {
		this.lineItems = [];
		this.agency = Object.assign({}, new Agency());
		this.company = Object.assign({}, new Company())
	}
}