import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PersonService } from './person.service';

describe('PersonService', () => {
  let service: PersonService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.get(PersonService);
    controller = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should request random French and German users', () => {
    service.getData().subscribe();

    controller.expectOne(req => {
      return req.url === 'https://randomuser.me/api/'
          && req.params.getAll('results').includes('5')
          && req.params.getAll('nationality').includes('de,fr');
    });
  });

  it('should expose the users', (done: DoneFn) => {
    service.getData().subscribe(result => {
      expect(result[0].name).toEqual('john smith');
      expect(result[0].nationality).toEqual('French');
      done();
    });

    controller
        .expectOne({ method: 'GET' })
        .flush({ results: [{ name: { first: 'john', last: 'smith' }, nat: 'FR' }] });
  });
});
