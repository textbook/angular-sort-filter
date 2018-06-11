import { Component, OnInit } from '@angular/core';

import { Observable, ReplaySubject } from 'rxjs';

import { Person, PersonService } from '../person.service';

@Component({
  selector: 'asf-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  private dataSubject = new ReplaySubject<Person[]>(1);

  data$: Observable<Person[]> = this.dataSubject.asObservable();

  constructor(private service: PersonService) {}

  ngOnInit() {
    this.refreshPeople();
  }

  refreshPeople() {
    this.service.getData().subscribe(people => this.dataSubject.next(people));
  }
}
