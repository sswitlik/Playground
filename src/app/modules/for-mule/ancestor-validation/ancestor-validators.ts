import { AbstractControl } from '@angular/forms';

export class AncestorValidators {
  static isUnique<T = any>(getControl: (control: T) => AbstractControl) {
    return (control: any) => {
      const controls = control.controls.slice(); // copy
      const result = [];
      const length = controls.length;
      for (let i = 0; i < length; i++) {
        if (!controls[i]) {
          continue;
        }
        const el = getControl(controls[i]);
        for (let j = i + 1; j < length; j++) {
          if (el && el.value && el.value === getControl(controls[j]).value) {
            if (controls[i]) {
              result.push(getControl(controls[i]));
              controls[i] = undefined;
            }

            result.push(getControl(controls[j]));
            controls[j] = undefined;
          }
        }
      }
      return result;
    };
  }
}
