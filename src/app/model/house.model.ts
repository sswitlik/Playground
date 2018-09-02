import { Person } from './person.model';
import { ManyToMany } from '../standalone/relation/many-to-many';
import { removeFromArray } from '../function/remove-from-array';

export class House {

  name: string;

  persons: Person[];

  private personsRelation = new ManyToMany<House, Person>(this, 'persons', 'housesRelation', {
    add: relative => {
      this.persons.push(relative);
    },
    erase: relative => {
      removeFromArray(this.persons, relative);
    }
  });

  constructor(name: string) {
    this.name = name;
    this.persons = [];
  }

  addPerson(person: Person) {
    this.personsRelation.add(person);
  }

  erasePerson(person: Person) {
    this.personsRelation.erase(person);
  }
}
