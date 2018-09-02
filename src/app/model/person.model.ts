import { Organization } from './organization.model';
import { House } from './house.model';
import { removeFromArray } from '../function/remove-from-array';
import { Subjectable } from '../standalone/subjectable.standalone';
import { OneToOne } from '../standalone/relation/one-to-one.standalone';
import { Car } from './car.model';
import { ManyToOne } from '../standalone/relation/many-to-one.standalone';
import { ManyToMany } from '../standalone/relation/many-to-many.standalone';


export class Person {
  get organization(): Organization {
    return this._organization;
  }

  set organization(value: Organization) {
    this.organizationRelation.set(value);
    this.observables.callSubject('organizationSet', value);
  }

  get car(): Car {
    return this._car;
  }

  set car(value: Car) {
    this.carRelation.set(value);
  }

  name: string;

  private _organization: Organization;

  houses: House[];

  observables: Subjectable<{ houseAdded: House, houseErased: House, organizationSet: Organization }>;

  private organizationRelation = new ManyToOne<Person, Organization>(this, 'organization', 'workersRelation', {
    set: (organization) => {
      this._organization = organization;
      console.log(`${this.name} => ${this.organization && this.organization.name} set`);
    }
  });

  private carRelation = new OneToOne<Person, Car>(this, 'car', 'ownerRelation', {
    set: (car) => {
      this._car = car;
      console.log(`${this.name} => ${this.car && this.car.name} set`);
    }
  });

  private housesRelation = new ManyToMany<Person, House>(this, 'houses', 'personsRelation', {
    add: relative => {
      this.houses.push(relative);
    },
    erase: relative => {
      removeFromArray(this.houses, relative);
    }
  });

  private _car: Car = null;

  constructor(name: string) {
    this.name = name;
    this._organization = null;
    this.houses = [];
    this.observables = new Subjectable();
  }

  addHouse(house: House) {
    this.housesRelation.add(house);
    this.observables.callSubject('houseAdded', house);
    return this.houses;
  }

  eraseHouse(house: House) {
    this.housesRelation.erase(house);
    this.observables.callSubject('houseErased', house);
    return this.houses;
  }
}
