import { Person } from './person.model';
import { OneToMany } from '../standalone/relation/one-to-many.standalone';
import { removeFromArray } from '../function/remove-from-array';

export class Organization {

  name: string;

  workers: Person[];

  private workersRelation = new OneToMany<Organization, Person>(this, 'organizationRelation', {
    add: relative => {
      this.workers.push(relative);
      console.log(`${this.name} => ${relative.name} add`);
    },
    erase: relative => {
      removeFromArray(this.workers, relative);
      console.log(`${this.name} => ${relative.name} erase`);
    }
  });

  constructor(name: string) {
    this.name = name;
    this.workers = [];
  }

  addWorker(worker: Person) {
    this.workersRelation.add(worker);
  }

  eraseWorker(worker: Person) {
    this.workersRelation.erase(worker);
  }
}
