import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type Nationality = 'German' | 'French';

export interface Person {
  name: string;
  nationality: Nationality;
}

export interface RawPerson {
  name: {
    title: string;
    first: string;
    last: string;
  };
  nat: 'de' | 'fr';
}

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private static url = 'https://randomuser.me/api/';

  constructor(private client: HttpClient) { }

  getData(): Observable<Person[]> {
    return this.client
        .get<{ results: RawPerson[] }>(PersonService.url, { params: { results: '5', nationality: 'de,fr' } })
        .pipe(
            map(({ results }) => results.map(({ name, nat }) => {
              let nationality;
              switch (nat.toLowerCase()) {
                case 'fr':
                  nationality = 'French';
                  break;
                case 'de':
                  nationality = 'German';
                  break;
              }
              return ({ name: `${name.first} ${name.last}`, nationality });
            }))
        );
  }
}
