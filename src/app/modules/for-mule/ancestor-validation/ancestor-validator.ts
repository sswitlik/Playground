import { AncestorValidatorFn } from './ancestor-validator-fn';
import { AbstractControl } from '@angular/forms';

export class AncestorValidator {
  private invalidControls: AbstractControl[] = [];

  private validatorFn: AncestorValidatorFn;

  private name: string;

  private ancestor: AbstractControl;

  constructor(validatorFn: AncestorValidatorFn, name: string = 'crossField') {
    this.validatorFn = validatorFn;
    this.name = name;
  }

  assign(source: AncestorValidator) {
    this.validatorFn = source.validatorFn;
    this.name = source.name;
  }

  forAncestor() {
    return (control) => {
      this.ancestor = control;

      const oldInvalid = this.invalidControls.slice(); // copy
      this.invalidControls = this.validatorFn(control);
      const toValidate = new Set(this.invalidControls.concat(oldInvalid));

      toValidate.forEach(el => this.validateUpToAncestor(el));

      let result = null;
      if (this.invalidControls.length) {
        result = {};
        result[this.name] = this.invalidControls.length;
      }
      return result;
    };
  }

  forDescendant() {
    return control => {
      let result = null;

      if (this.invalidControls.includes(control)) {
        result = {};
        result[this.name] = true;
      }
      return result;
    };
  }

  private validateUpToAncestor(control: AbstractControl) {
    while (control !== this.ancestor) {
      control.updateValueAndValidity({onlySelf: true});
      control = control.parent;
    }
  }
}
