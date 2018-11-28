import { Relation } from './relation';
import { ManyMethods } from '../interfaces/many-methods.inteface';

export abstract class ToMany<T, U> extends Relation<T, U> {

  protected methods: ManyMethods<U>;

  public add(newRelative: U) {
    this.oppositeOnAdd(this.owner, newRelative);
    this.addUnrelated(newRelative);
  }

  public erase(oldRelative: U) {
    this.oppositeOnErase(this.owner, oldRelative);
    this.eraseUnrelated(oldRelative);
  }

  protected abstract oppositeOnAdd(owner: T, relative: U);

  protected abstract oppositeOnErase(owner: T, onRelative: U);

  private addUnrelated(relative: U) {
    this.methods.add(relative);
  }

  private eraseUnrelated(relative: U) {
    this.methods.erase(relative);
  }
}
