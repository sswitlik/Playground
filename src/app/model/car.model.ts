import { Person } from './person.model';
import { OneToOne } from '../standalone/relation/one-to-one.standalone';

export class Car {
  owner: OneToOne<Person, 'car'> = new OneToOne();

  brand: string;
}
