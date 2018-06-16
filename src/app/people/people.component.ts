import { Component, OnInit } from '@angular/core';

import { combineLatest, Observable, ReplaySubject } from 'rxjs';
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
  private nationalitySubject = new ReplaySubject<Nationality | null>(1);
  private sortSubject = new ReplaySubject<Sorter<Person>>(1);

  private filterer$: Observable<Filterer<Person>> = this.nationalitySubject
      .pipe(map(nat => nat ? createFieldFilterer('nationality', nat) : noOpFilterer));

  nationalities: Nationality[] = ['French', 'German'];
  sortable = true;

  data$: Observable<Person[]>;
  selectedNationality$ = this.nationalitySubject.asObservable();

  constructor(private service: PersonService) {
    this.data$ = combineLatest(this.dataSubject, this.filterer$, this.sortSubject)
        .pipe(map(([data, filterer, sorter]) => data.filter(filterer).sort(sorter)));
  }

  ngOnInit() {
    this.refreshPeople();
  }

  filterPeople(nationality: Nationality) {
    this.nationalitySubject.next(nationality);
  }

  refreshPeople() {
    this.service.getData().subscribe(people => {
      this.resetFilter();
      this.resetSort();
      this.dataSubject.next(people);
    });
  }

  sortPeople() {
    this.sortable = false;
    this.sortSubject.next(createFieldSorter('name'));
  }

  private resetFilter() {
    this.nationalitySubject.next(null);
  }

  private resetSort() {
    this.sortable = true;
    this.sortSubject.next(noOpSorter);
  }
}
