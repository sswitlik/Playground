import { Relation } from './relation';

export abstract class ToMany<T, U> extends Relation<T, U> {

  public add(relative: U) {
    this.oppositeOnAdd(this.owner, relative);
    this.addUnrelated(relative);
  }

  public erase(relative: U) {
    this.oppositeOnErase(this.owner, relative);
    this.eraseUnrelated(relative);

  }

  protected abstract oppositeOnAdd(owner: T, relative: U);

  protected abstract oppositeOnErase(owner: T, relative: U);

  private addUnrelated(relative: U) {
    this.methods.add(relative);
  }

  private eraseUnrelated(relative: U) {
    this.methods.erase(relative);
  }
}
