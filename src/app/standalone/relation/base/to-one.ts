import { Relation } from './relation';
import { OneMethods } from '../interfaces/one-methods.interface';

export abstract class ToOne<T, U> extends Relation<T, U> {

  protected methods: OneMethods<U>;

  constructor(owner: T, ownerValueKey: string, oppositeRelationKey: string, methods: OneMethods<U>) {
    super(owner, ownerValueKey, oppositeRelationKey, methods);
  }

  public set(relative: U) {
    if (this.owner[this.ownerValueKey]) {
      this.oppositeOnUnset(this.owner, relative);
    }
    if (relative) {
      this.oppositeOnSet(this.owner, relative);
    }
    this.setUnrelated(relative);
  }

  protected abstract oppositeOnSet(owner: T, relative: U);

  protected abstract oppositeOnUnset(owner: T, relative: U);

  protected setUnrelated(relative: U) {
    this.methods.set(relative);
  }
}
