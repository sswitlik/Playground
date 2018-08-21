import { Component, OnInit } from '@angular/core';
import { Person } from './model/person.model';
import { House } from './model/house.model';
import { Car } from './model/car.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = '';

  ngOnInit() {
    // console.log(House);
    // console.log(Person);
  }

  newPerson() {
    const p = new Person('p');
    const c = new Car();
    p.car.set(c);
    console.log(p);
  }

  newHouse() {
    console.log(new House('h'));
  }

  click(arg) {
    console.log(arg);
  }
}
