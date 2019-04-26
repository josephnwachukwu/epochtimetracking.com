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
	date:string;
	// Invoice Line Items
	lineItems?:any[];
	
	subtotal: number;
	taxAmount:number;
	// Functions
	calcSubtotal:any;
	calcTax:any;
	calcTotal:any;
	notes: string;
	
	// Total
	finalTotal:number;
	term: string;

	// Discount
	hasDiscount:boolean;
	discount: number;

	// Tax
	hasTax:boolean;
	tax: number;

	// Comments
	hasComments:boolean;
	comments:string;


	for:string;
	
	constructor() {
		this.lineItems = [];
		this.agency = Object.assign({}, new Agency());
		this.company = Object.assign({}, new Company())
		this.tax = 0;
		this.subtotal = 0;
		this.discount = 0;
		this.for = 'Consulting Hours and/or Expenses';
		this.term = 'Upon Reciept'
		this.hasDiscount = false;
		this.hasComments = false;
		this.hasTax = false;
		this.name = 'Invoice ' + new Date().toDateString()
	}
}