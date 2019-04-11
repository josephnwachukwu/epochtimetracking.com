export class Client {
  //id?: string;
  time?: number;
  userId?: string;
  managerId?: string;
  managerName?: string;
  managerEmail?: string;
  managerVerified?: boolean;
  projects?:string[];
  vacationHours?: number;
  sickHours?: number;
  clientName?: string;
  constructor() {
    this.managerVerified = false;
    this.projects = []
    this.vacationHours = 0;
    this.sickHours = 0;
  }
}
