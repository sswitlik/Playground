import { Organization } from './organization.model';
import { House } from './house.model';
import { removeFromArray } from '../function/remove-from-array';
import { Subjectable } from '../standalone/subjectable.standalone';
import { OneToOne } from '../standalone/relation/one-to-one.standalone';
import { Car } from './car.model';


export class Person {

  name: string;

  organization: Organization;

  houses: House[];

  car: OneToOne<Car, 'owner'> = new OneToOne();

  observables: Subjectable<{ houseAdded: House, houseErased: House, organizationSet: Organization }>;

  constructor(name: string) {
    this.name = name;
    this.organization = null;
    this.houses = [];
    this.observables = new Subjectable();
  }

  setOrganization(organization: Organization) {
    this.organization = organization;
    this.observables.callSubject('organizationSet', organization);
  }

  addHouse(house: House) {
    this.houses.push(house);
    this.observables.callSubject('houseAdded', house);
    return this.houses;
  }

  eraseHouse(house: House) {
    removeFromArray(this.houses, house);
    this.observables.callSubject('houseErased', house);
    return this.houses;
  }
}
