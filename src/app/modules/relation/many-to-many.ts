import { ToMany } from './base/to-many';

export class ManyToMany<T, U> extends ToMany<T, U> {

  oppositeOnAdd(owner: T, relative: U) {
    relative[this.oppositeRelationKey].addUnrelated(this.owner);
  }

  oppositeOnErase(owner: T, relative: U) {
    relative[this.oppositeRelationKey].eraseUnrelated(this.owner);
  }
}
