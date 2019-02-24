import { ToOne } from './base/to-one';

export class OneToOne<T, U> extends ToOne<T, U> {

  oppositeOnSet(owner: T, relative: U) {
    relative[this.oppositeRelationKey].setUnrelated(this.owner);
  }

  oppositeOnUnset(owner: T, relative: U) {
    this.owner[this.ownerValueKey][this.oppositeRelationKey].setUnrelated(null);
  }
}
