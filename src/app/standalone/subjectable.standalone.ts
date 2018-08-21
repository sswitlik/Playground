import { Subject, Subscription } from 'rxjs';

export class Subjectable<T = {[key: string]: any}> {
  private map: Map<keyof T, Subject<any>> = new Map();

  getSubject(event: keyof T) {
    let subject = this.map.get(event);
    if (!subject) {
      subject = new Subject();
      this.map.set(event, subject);
    }
    return subject;
  }

  subscribe(event: keyof T, next?: (value: any) => void, error?: (error: any) => void, complete?: () => void): Subscription {
    const subject = this.getSubject(event);
    return subject.subscribe(next, error, complete);
  }

  callSubject<K extends keyof T>(event: K, value: T[K]) {
    const subject = this.map.get(event);
    if (subject) {
      subject.next(value);
    }
  }
}
