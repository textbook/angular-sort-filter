import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Person {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private people: Person[] = [
    { name: 'Charlie' },
    { name: 'Angela' },
    { name: 'Barry' },
  ];

  constructor() { }

  getData(): Observable<Person[]> {
    return of(this.people);
  }
}
