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
	tax: number;
	subtotal: number;
	taxAmount:number;
	// Functions
	calcSubtotal:any;
	calcTax:any;
	calcTotal:any;
	notes: string;
	discount: number;
	finalTotal:number;
	term: string;
	isDiscount:boolean;
	isTaxable:boolean;


	constructor() {
		this.lineItems = [];
		this.agency = Object.assign({}, new Agency());
		this.company = Object.assign({}, new Company())
		this.tax = 0;
		this.subtotal = 0;
		this.discount = 0;

		// this.calcSubtotal = () => {
		// 	let subtotal = 0;
		// 	for(let i in this.lineItems) {
		// 		subtotal += this.lineItems[i] * this.agency.rate
		// 	}
		// 	this.subtotal = subtotal;
		// }

		// this.calcTax = () => {
		// 	let sum = 0;
		// 	sum += this.subtotal * (1 * this.tax)
		// 	return sum
		// }

		// this.calcTotal = () => {

		// }

	}
}