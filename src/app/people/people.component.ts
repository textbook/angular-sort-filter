import { Component, OnInit } from '@angular/core';

import { BehaviorSubject, combineLatest, Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Person, PersonService } from '../person.service';
import { createFieldSorter, noOpSorter, Sorter } from './sorting';

@Component({
  selector: 'asf-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  private dataSubject = new ReplaySubject<Person[]>(1);
  private sortSubject = new BehaviorSubject<Sorter<Person>>(noOpSorter);

  data$: Observable<Person[]> = this.dataSubject.asObservable();

  constructor(private service: PersonService) {
    this.data$ = combineLatest(
        this.dataSubject.asObservable(),
        this.sortSubject.asObservable(),
    ).pipe(
        map(([data, sorter]) => data.sort(sorter))
    );
  }

  ngOnInit() {
    this.refreshPeople();
  }

  refreshPeople() {
    this.service.getData().subscribe(people => this.dataSubject.next(people));
  }

  sortPeople() {
    this.sortSubject.next(createFieldSorter('name'));
  }
}
