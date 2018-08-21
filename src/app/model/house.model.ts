import { Person } from './person.model';

export class House {

  name: string;

  persons: Person[];

  constructor(name: string) {
    this.name = name;
    this.persons = [];
  }
}
