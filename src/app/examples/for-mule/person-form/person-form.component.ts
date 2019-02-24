import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import { AncestorValidators } from '../../../modules/for-mule/ancestor-validation/ancestor-validators';
import { AncestorVaidatorPool } from '../../../modules/for-mule/ancestor-validation/ancestor-vaidator-pool';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {

  form: FormGroup;

  ancestorValidatorPool = new AncestorVaidatorPool();

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      lastName: new FormControl(),
      children: new FormArray([
        new FormGroup({
          name: new FormControl(null, this.ancestorValidatorPool.get('isNameUnique').forDescendant()),
          lastName: new FormControl()
        }),
        new FormGroup({
          name: new FormControl(null, this.ancestorValidatorPool.get('isNameUnique').forDescendant()),
          lastName: new FormControl()
        }),
        new FormGroup({
          name: new FormControl(null, this.ancestorValidatorPool.get('isNameUnique').forDescendant()),
          lastName: new FormControl()
        })
      ], [
        this.ancestorValidatorPool.create('isNameUnique',
          AncestorValidators.isUnique(control => control.controls.name))
          .forAncestor()
      ])
    });
  }

  click(...args) {
    console.log(...args);
  }
}
