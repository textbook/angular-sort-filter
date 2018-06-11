import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Person {
  name: string;
}

export interface RawPerson {
  name: {
    title: string;
    first: string;
    last: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private static url = 'https://randomuser.me/api/';

  constructor(private client: HttpClient) { }

  getData(): Observable<Person[]> {
    return this.client
        .get<{ results: RawPerson[] }>(PersonService.url, { params: { results: '5' } })
        .pipe(
            map(({ results }) => results.map(({ name }) => ({ name: `${name.first} ${name.last}`})))
        );
  }
}
