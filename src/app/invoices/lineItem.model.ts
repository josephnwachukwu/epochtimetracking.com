export class LineItem {
	billableHours:number;
	amount:number;
	amountWithTax:number;
	constructor() {
		this.billableHours = 0;
		this.amount = 0;
	}
}