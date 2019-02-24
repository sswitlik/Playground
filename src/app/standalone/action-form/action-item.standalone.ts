// import { MenuItem } from 'primeng/api';

export interface ActionItem<T = any> { // extends MenuItem {
    disabledWhen?: (data: T, item: ActionItem<T>) => boolean;
    hiddenWhen?: (data: T, item: ActionItem<T>) => boolean;
    command?: (data: T) => void;
}
