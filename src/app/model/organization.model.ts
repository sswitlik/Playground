import { Person } from './person.model';
import { OneToMany } from '../standalone/relation/one-to-many';

export class Organization {

  name: string;

  workers: Set<Person>;

  private workersRelation = new OneToMany<Organization, Person>(this, 'organizationRelation', {
    add: relative => {
      this.workers.add(relative);
      console.log(`${this.name} => ${relative.name} add`);
    },
    erase: relative => {
      this.workers.delete(relative);
      console.log(`${this.name} => ${relative.name} erase`);
    }
  });

  constructor(name: string) {
    this.name = name;
    this.workers = new Set<Person>();
  }

  addWorker(worker: Person) {
    this.workersRelation.add(worker);
  }

  eraseWorker(worker: Person) {
    this.workersRelation.erase(worker);
  }
}
