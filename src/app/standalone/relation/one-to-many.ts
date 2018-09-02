import { ToMany } from './base/to-many';

export class OneToMany<T, U> extends ToMany<T, U> {

  oppositeOnAdd(owner: T, relative: U) {
    if (relative) {
      relative[this.oppositeRelationKey].setUnrelated(this.owner);
    }
  }

  oppositeOnErase(owner: T, relative: U) {
    if (relative) {
      relative[this.oppositeRelationKey].setUnrelated(null);
    }
  }
}
