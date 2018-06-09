import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Person, PersonService } from '../person.service';

@Component({
  selector: 'asf-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent {

  data$: Observable<Person[]>;

  constructor(private service: PersonService) {
    this.data$ = service.getData();
  }
}
