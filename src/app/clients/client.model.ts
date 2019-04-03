export class Client {
  id?: string;
  time: number;
  userId: string;
  managerId?: string;
  managerName?: string;
  managerEmail?: string;
  managerVerified: boolean;
  projects?:string[];
  vacationHours: string;
  sickHours: string;
  clientName: string;
}
