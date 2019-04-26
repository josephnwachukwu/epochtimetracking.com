export class Client {
  id?: string;
  time?: number;
  userId?: string;
  managerId?: string;
  managerName?: string;
  managerEmail?: string;
  managerVerified?: boolean;
  projects?:any[];
  vacationHours?: number;
  sickHours?: number;
  clientName?: string;
  hourlyRate?:string;
  constructor() {
    this.managerVerified = false;
    this.projects = [
      {
        client: '',
        clientId: '',
        description: 'Vacation Days or Planned Vacation',
        name: 'Vacation',
        time: '',
      },
      {
        client: '',
        clientId: '',
        description: 'Sick Time or Peronal Time',
        name: 'Sick Time',
        time: '',
      },
      {
        client: '',
        clientId: '',
        description: 'Paid Time Off',
        name: 'Paid Time Off',
        time: '',
      },
      {
        client: '',
        clientId: '',
        description: 'National or public holiday',
        name: 'Holoday',
        time: '',
      }
    ]
    this.vacationHours = 0;
    this.sickHours = 0;
  }
}
