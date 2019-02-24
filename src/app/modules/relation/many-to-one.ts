interface ManyToOneMethods<U> {
  set: (relative: U) => void;
}

export class ManyToOne<T, U> {

  private readonly oppositeRelationKey: string;

  private readonly ownerValueKey: string;

  private readonly owner: T;

  private methods: ManyToOneMethods<U>;

  constructor(owner: T, ownerValueKey: string, oppositeRelationKey: string, methods: ManyToOneMethods<U>) {
    this.owner = owner;
    this.ownerValueKey = ownerValueKey;
    this.oppositeRelationKey = oppositeRelationKey;
    this.methods = methods;
  }

  set(relative: U) {
    console.log(this, relative);
    if (this.owner[this.ownerValueKey]) {
      this.owner[this.ownerValueKey][this.oppositeRelationKey].eraseUnrelated(this.owner);
    }
    if (relative) {
      relative[this.oppositeRelationKey].addUnrelated(this.owner);
    }
    this.setUnrelated(relative);
  }

  private setUnrelated(relative: U) {
    this.methods.set(relative);
  }
}
