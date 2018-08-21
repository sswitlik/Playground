type OneToOneKey<T> = {[K in keyof T]: T[K] extends OneToOne<any, any> ? K : never}[keyof T];

export class OneToOne<T, K extends OneToOneKey<T>> {
  set(relative: T) {
    console.log(relative);
  }
}
