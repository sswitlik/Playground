import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ActionFormField, ActionFormFieldType } from '../_standalone/action-form-field.interface';
import { ActionItem } from '../_standalone/action-item.standalone';
import { FormGroup, FormControl } from '@angular/forms';
import { BaseShared } from '../../../domain/models/base/base-shared.model';
import { SubscribingPageComponent } from '../../pages/_base/subribing-page.component';

@Component({
    selector: 'kp-action-form',
    templateUrl: './action-form.component.html'
})
export class ActionFormComponent<T> extends SubscribingPageComponent implements OnChanges {

    ActionFormFieldType = ActionFormFieldType;

    @Input()
    value: T;

    @Input()
    fields: ActionFormField<T>[];

    @Input()
    actions: ActionItem[];

    @Input()
    header: string;

    @Output()
    formSet = new EventEmitter<FormGroup>();

    @Output()
    valueChange = new EventEmitter<Partial<T>>();

    formModel: FormGroup;

    private baseValue: any;

    ngOnChanges(changes: SimpleChanges) {
        if (changes.fields && this.fields) {
            this.initFormModel();
        }
        if (changes.value || changes.fields) {
            if (this.value && this.fields) {
                this.formModel.setValue(BaseShared.getFormedObject(this.value, this.baseValue));
            }
        }
    }

    private initFormModel(): void {
        const formControls: any = {};
        this.baseValue = {};
        this.fields.forEach(field => {
            const value = { value: '', disabled: !!field.disabled }
            formControls[field.field] = new FormControl(value, field.validators || []);
            this.baseValue[field.field] = '';
        });
        this.formModel = new FormGroup(formControls);
        this.subs.push(this.formModel.valueChanges.subscribe(el => {
            this.valueChange.emit(el);
        }));
        this.formSet.emit(this.formModel);
    }

    click(...args) {
        console.log(...args);
    }
}
