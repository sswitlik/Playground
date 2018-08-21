import { Person } from './person.model';

export class Organization {

  name: string;

  workers: Person[];

  constructor(name: string) {
    this.name = name;
    this.workers = [];
  }
}
