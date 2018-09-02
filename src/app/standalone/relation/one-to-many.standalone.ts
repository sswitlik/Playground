import { ManyMethods } from './interfaces/many-methods.inteface';

export class OneToMany<T, U> {

  private readonly oppositeRelationKey: string;

  private readonly owner: T;

  private methods: ManyMethods<U>;

  constructor(owner: T, oppositeRelationKey: string, methods: ManyMethods<U>) {
    this.owner = owner;
    this.oppositeRelationKey = oppositeRelationKey;
    this.methods = methods;
  }

  add(relative: U) {
    if (relative) {
      relative[this.oppositeRelationKey].setUnrelated(this.owner);
    }
    console.log(this);
    this.addUnrelated(relative);
  }

  erase(relative: U) {
    if (relative) {
      relative[this.oppositeRelationKey].setUnrelated(null);
    }
    this.eraseUnrelated(relative);
  }

  private addUnrelated(relative: U) {
    this.methods.add(relative);
  }

  private eraseUnrelated(relative: U) {
    this.methods.erase(relative);
  }
}
