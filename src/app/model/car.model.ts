import { Person } from './person.model';
import { OneToOne } from '../standalone/relation/one-to-one';

export class Car {
  get owner(): Person {
    return this._owner;
  }

  set owner(value: Person) {
    this.ownerRelation.set(value);
  }

  private ownerRelation = new OneToOne<Car, Person>(this, 'owner', 'carRelation', {
    set: (owner) => {
      this._owner = owner;
      console.log(`${this.name} => ${this.owner && this.owner.name} set`);
    }
  });

  private _owner: Person;

  name: string;

  constructor(name: string) {
    this.name = name;
  }

}
