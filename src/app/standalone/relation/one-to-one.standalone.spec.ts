import { OneToOne } from './one-to-one.standalone';

class A {
  b: B;

  bRelation = new OneToOne<A, B>(this, 'b', 'aRelation', {
    set: relative => {
      this.b = relative;
    }
  });
}

class B {
  a: A;

  aRelation = new OneToOne<B, A>(this, 'a', 'bRelation', {
    set: relative => {
      this.a = relative;
    }
  });
}

describe('OneToOne', () => {

  it('should save relation when it is set', () => {
    const a = new A();
    const b = new B();

    a.bRelation.set(b);
    expect(a.b).toBe(b);
  });

  it('should set the opposite relation when one is set', () => {
    const a = new A();
    const b = new B();

    a.bRelation.set(b);
    expect(b.a).toBe(a);
  });

  it('should unset the opposite relation when one is unset', () => {
    const a = new A();
    const b = new B();

    a.bRelation.set(b);
    a.bRelation.set(null);
    expect(b.a).toBeNull();
  });

  it('should unset one when the opposite is unset', () => {
    const a = new A();
    const b = new B();

    a.bRelation.set(b);
    b.aRelation.set(null);
    expect(a.b).toBeNull();
  });

  it('should not throw an error when non-related object is unset', () => {
    const a = new A();

    a.bRelation.set(null);
  });

  it('should unset the opposite relation when one is set to another', () => {
    const a = new A();
    const b1 = new B();

    a.bRelation.set(b1);
    const b2 = new B();
    a.bRelation.set(b2);
    expect(b1.a).toBeNull();
  });

  it('should unset relation when the opposite is set to another', () => {
    const a1 = new A();
    const b = new B();

    a1.bRelation.set(b);
    const a2 = new A();
    b.aRelation.set(a2);
    expect(a1.b).toBeNull();
  });

  it('should not throw an error when relation is set the same object', () => {
    const a = new A();
    const b = new B();

    a.bRelation.set(b);
    a.bRelation.set(b);
  });
});
