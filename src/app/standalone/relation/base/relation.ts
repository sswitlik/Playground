import { ManyMethods } from '../interfaces/many-methods.inteface';

export abstract class Relation<T, U> {

  protected readonly oppositeRelationKey: string;

  protected readonly ownerValueKey: string;

  protected readonly owner: T;

  protected methods: ManyMethods<U>;

  constructor(owner: T, ownerValueKey: string, oppositeRelationKey: string, methods: ManyMethods<U>) {
    this.owner = owner;
    this.ownerValueKey = ownerValueKey;
    this.oppositeRelationKey = oppositeRelationKey;
    this.methods = methods;
  }
}
