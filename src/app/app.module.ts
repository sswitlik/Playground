import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RelationComponent } from './examples/relation/relation/relation.component';
import { PersonFormComponent } from './examples/for-mule/person-form/person-form.component';

@NgModule({
  declarations: [
    AppComponent,
    RelationComponent,
    PersonFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
