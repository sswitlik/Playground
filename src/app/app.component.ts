import { Component, OnInit } from '@angular/core';
import { Person } from './model/person.model';
import { House } from './model/house.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
  }

  newPerson() {
    const persons: Person[] = [];
    const houses: House[] = [];
    for (let i = 0; i < 10; i++) {
      persons.push(new Person(`p${i}`));
      houses.push(new House(`h${i}`));
    }
    console.log(persons);
    console.log(houses);
  }

  newHouse() {
    console.log(new House('h'));
  }

  click(arg) {
    console.log(arg);
  }
}
