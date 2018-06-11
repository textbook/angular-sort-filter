import { Component, OnInit } from '@angular/core';

import { combineLatest, Observable, ReplaySubject } from 'rxjs';
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
  private sortSubject = new ReplaySubject<Sorter<Person>>(1);

  private sortable = true;

  data$: Observable<Person[]>;

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
    this.service.getData().subscribe(people => {
      this.resetSort();
      this.dataSubject.next(people);
    });
  }

  sortPeople() {
    this.sortable = false;
    this.sortSubject.next(createFieldSorter('name'));
  }

  private resetSort() {
    this.sortable = true;
    this.sortSubject.next(noOpSorter);
  }
}
