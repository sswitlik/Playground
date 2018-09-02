import { ManyMethods } from './interfaces/many-methods.inteface';

export class ManyToMany<T, U> {

  private readonly oppositeRelationKey: string;
  private readonly ownerValueKey: string;

  private readonly owner: T;

  private methods: ManyMethods<U>;

  constructor(owner: T, ownerValueKey: string, oppositeRelationKey: string, methods: ManyMethods<U>) {
    this.owner = owner;
    this.ownerValueKey = ownerValueKey;
    this.oppositeRelationKey = oppositeRelationKey;
    this.methods = methods;
  }

  add(relative: U) {
    relative[this.oppositeRelationKey].addUnrelated(this.owner);
    this.addUnrelated(relative);
  }

  erase(relative: U) {
    relative[this.oppositeRelationKey].eraseUnrelated(this.owner);
    this.eraseUnrelated(relative);
  }

  private addUnrelated(relative: U) {
    this.methods.add(relative);
  }

  private eraseUnrelated(relative: U) {
    this.methods.erase(relative);
  }
}
