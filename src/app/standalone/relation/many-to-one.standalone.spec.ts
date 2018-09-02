import { OneToMany } from './one-to-many.standalone';
import { ManyToOne } from './many-to-one.standalone';
import * as _ from 'lodash';

class One {
  b: Many[] = [];

  constructor(metods: any) {
    this.bRelation = new OneToMany<One, Many>(this, 'aRelation', metods);
  }

  bRelation: OneToMany<One, Many>;
}

class Many {
  a: One;

  constructor(metods: any) {
    this.aRelation = new ManyToOne<Many, One>(this, 'a', 'bRelation', metods);
  }

  aRelation: ManyToOne<Many, One>;
}

describe('ManyToOne', () => {
  const functions = {
    add: () => {
      console.log('add');
    },
    erase: () => {
      console.log('erase');
    },
    set: () => {
      console.log('set');
    }
  };

  it('setting relation should call owner set function with added relative', () => {
    const many = new Many(functions);
    const one = new One(functions);
    const spy = spyOn(functions, 'set');

    many.aRelation.set(one);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(one);
  });

  it('setting relation should call relative add function with owner', () => {
    const many = new Many(functions);
    const one = new One(functions);
    const spy = spyOn(functions, 'add');

    many.aRelation.set(one);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(many);
  });

  it('unsetting relation should call owner set function with null', () => {
    const many = new Many(functions);
    const one = new One(functions);

    many.aRelation.set(one);
    const spy = spyOn(functions, 'set');
    many.aRelation.set(null);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(null);
  });


  it('unsetting relation should call relative erase function with owner', () => {
    const many = new Many(functions);
    const one = new One(functions);

    many.aRelation.set(one);
    many.a = one;
    const spy = spyOn(functions, 'erase');
    many.aRelation.set(null);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(many);
  });

  it('setting relation to another object should call erase with owner for previous and add with owner for new', () => {
    const functions1 = _.clone(functions);
    const functions2 = _.clone(functions);

    const many = new Many(functions);
    const one1 = new One(functions1);
    const one2 = new One(functions2);

    many.aRelation.set(one1);
    many.a = one1;
    const spyErase = spyOn(functions1, 'erase');
    const spyAdd = spyOn(functions2, 'add');
    many.aRelation.set(one2);

    expect(spyAdd).toHaveBeenCalledTimes(1);
    expect(spyAdd).toHaveBeenCalledWith(many);

    expect(spyErase).toHaveBeenCalledTimes(1);
    expect(spyErase).toHaveBeenCalledWith(many);
  });
});
