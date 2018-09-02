import * as _ from 'lodash';
import { ManyToMany } from './many-to-many';

class A {
  b: B[] = [];

  constructor(metods: any) {
    this.bRelation = new ManyToMany<A, B>(this, 'b', 'aRelation', metods);
  }

  bRelation: ManyToMany<A, B>;
}

class B {
  a: A[] = [];

  constructor(metods: any) {
    this.aRelation = new ManyToMany<B, A>(this, 'a', 'bRelation', metods);
  }

  aRelation: ManyToMany<B, A>;
}

describe('OneToMany', () => {
  const functions = {
    add: () => {
    },
    erase: () => {
    },
    set: () => {
    }
  };

  it('adding relative to owner should call owner add method with relative', () => {
    const functions1 = _.clone(functions);
    const a = new A(functions1);
    const b = new B(functions);

    const spy = spyOn(functions1, 'add');
    a.bRelation.add(b);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(b);
  });

  it('adding relative to owner should call relative add method with owner', () => {
    const functions2 = _.clone(functions);
    const a = new A(functions);
    const b = new B(functions2);

    const spy = spyOn(functions2, 'add');
    a.bRelation.add(b);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(a);
  });

  it('erasing relative from owner should call owner erase method with relative', () => {
    const functions1 = _.clone(functions);
    const a = new A(functions1);
    const b = new B(functions);

    a.bRelation.add(b);
    a.b.push(b);
    const spy = spyOn(functions1, 'erase');
    a.bRelation.erase(b);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(b);
  });

  it('erasing relative from owner should call relative erase method with owner', () => {
    const functions2 = _.clone(functions);
    const a = new A(functions);
    const b = new B(functions2);

    a.bRelation.add(b);
    a.b.push(b);
    const spy = spyOn(functions2, 'erase');
    a.bRelation.erase(b);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(a);
  });

});
