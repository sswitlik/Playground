import { AncestorValidator } from './ancestor-validator';
import { AncestorValidatorFn } from './ancestor-validator-fn';

export class AncestorVaidatorPool {
  private validators = new Map<string, AncestorValidator>();

  create(id: string, validatorFn: AncestorValidatorFn, name?: string) {
    const result = this.validators.get(id);
    if (result) {
      result.assign(new AncestorValidator(validatorFn, name));
    } else {
      this.validators.set(id, result);
    }
    return result;
  }

  delete(id: string) {
    return this.validators.delete(id);
  }

  clear() {
    return this.validators.clear();
  }

  get(id: string) {
    let validator = this.validators.get(id);
    if (!validator) {
      validator = new AncestorValidator(null);
      this.validators.set(id, validator);
    }
    return validator;
  }
}
