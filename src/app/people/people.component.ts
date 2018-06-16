import { Component, OnInit } from '@angular/core';

import { BehaviorSubject, combineLatest, Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Nationality, Person, PersonService } from '../person.service';
import { createFieldSorter, noOpSorter, Sorter } from './sorting';
import { createFieldFilterer, Filterer, noOpFilterer } from './filtering';

@Component({
  selector: 'asf-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  private dataSubject = new ReplaySubject<Person[]>(1);
  private nationalitySubject = new BehaviorSubject<Nationality | null>(null);
  private sortSubject = new ReplaySubject<Sorter<Person>>(1);

  private filterer$: Observable<Filterer<Person>> = this.nationalitySubject
      .pipe(map(nat => nat ? createFieldFilterer('nationality', nat) : noOpFilterer));
  private sortable = true;

  nationalities: Nationality[] = ['French', 'German'];

  data$: Observable<Person[]>;

  constructor(private service: PersonService) {
    this.data$ = combineLatest(this.dataSubject, this.filterer$, this.sortSubject)
        .pipe(map(([data, filterer, sorter]) => data.filter(filterer).sort(sorter)));
  }

  ngOnInit() {
    this.refreshPeople();
  }

  filteredBy$(nationality: Nationality): Observable<boolean> {
    return this.nationalitySubject.pipe(map(nat => nat === nationality));
  }

  filterPeople(nationality: Nationality) {
    this.nationalitySubject.next(nationality);
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
