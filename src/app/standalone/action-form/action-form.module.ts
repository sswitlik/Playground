import { NgModule } from '@angular/core';
import { ActionFormComponent } from './action-form.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { ActionButtonModule } from '../action-button/action-button.module';
import { InputTextModule, CalendarModule, DropdownModule, PasswordModule, InputTextareaModule } from 'primeng/primeng';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TranslateModule.forChild(),

        ButtonModule,
        InputTextModule,
        InputTextareaModule,
        CalendarModule,
        DropdownModule,
        PasswordModule,

        ActionButtonModule,
    ],
    declarations: [ActionFormComponent],
    exports: [ActionFormComponent]
})
export class ActionFormModule {
}
