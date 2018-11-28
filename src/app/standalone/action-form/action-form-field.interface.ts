import { ValidatorFn } from '@angular/forms';

export enum ActionFormFieldType {
    INPUT,
    CALENDAR,
    SELECT,
    PASSWORD,
    SPINNER,
    TEXTAREA
}

export interface ActionFormField<T> {
    type: ActionFormFieldType,
    field: keyof T;
    label?: string;
    validators?: ValidatorFn[];
    options?: any[];
    optionName?: string;
    placeholder?: string;
    disabled?: boolean;
    keydownEnter?: (Event) => void;
}