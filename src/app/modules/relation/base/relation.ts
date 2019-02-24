export abstract class Relation<T, U> {

  protected readonly oppositeRelationKey: string;

  protected readonly ownerValueKey: string;

  protected readonly owner: T;

  protected methods: any;

  constructor(owner: T, ownerValueKey: string, oppositeRelationKey: string, methods: any) {
    this.owner = owner;
    this.ownerValueKey = ownerValueKey;
    this.oppositeRelationKey = oppositeRelationKey;
    this.methods = methods;
  }
}
