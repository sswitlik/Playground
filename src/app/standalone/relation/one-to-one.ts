import { OneMethods } from './interfaces/one-methods.interface';

export class OneToOne<T, U> {

  private readonly oppositeRelationKey: string;

  private readonly ownerValueKey: string;

  private readonly owner: T;

  private methods: OneMethods<U>;

  constructor(owner: T, ownerValueKey: string, oppositeRelationKey: string, methods: OneMethods<U>) {
    this.owner = owner;
    this.ownerValueKey = ownerValueKey;
    this.oppositeRelationKey = oppositeRelationKey;
    this.methods = methods;
  }

  set(relative: U) {
    console.log(this);
    if (this.owner[this.ownerValueKey]) {
      this.owner[this.ownerValueKey][this.oppositeRelationKey].setUnrelated(null);
    }
    if (relative) {
      relative[this.oppositeRelationKey].setUnrelated(this.owner);
    }
    this.setUnrelated(relative);
  }

  private setUnrelated(relative: U) {
    this.methods.set(relative);
  }
}
