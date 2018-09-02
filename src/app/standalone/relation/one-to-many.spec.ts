import { OneToMany } from './one-to-many';
import { ManyToOne } from './many-to-one';

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

describe('OneToMany', () => {
  const functions = {
    add: () => {},
    erase: () => {},
    set: () => {}
  };

  it('adding relative should call owner add method with this relative', () => {
    const one = new One(functions);
    const many = new Many(functions);
    const spy = spyOn(functions, 'add');

    one.bRelation.add(many);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(many);
  });

  it('adding relative should call its set method with owner', () => {
    const one = new One(functions);
    const many = new Many(functions);
    const spy = spyOn(functions, 'set');

    one.bRelation.add(many);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(one);
  });

  it('erasing relative should call owner erase method with this relative', () => {
    const one = new One(functions);
    const many = new Many(functions);

    one.bRelation.add(many);
    const spy = spyOn(functions, 'erase');
    one.bRelation.erase(many);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(many);
  });

  it('erasing relative should call its set method with null', () => {
    const one = new One(functions);
    const many = new Many(functions);

    one.bRelation.add(many);
    const spy = spyOn(functions, 'set');
    one.bRelation.erase(many);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(null);
  });
});


