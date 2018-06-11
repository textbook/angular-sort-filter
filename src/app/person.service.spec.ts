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

  it('should request random users', () => {
    service.getData().subscribe();

    controller.expectOne('https://randomuser.me/api/?results=5');
  });

  it('should expose the users', (done: DoneFn) => {
    service.getData().subscribe(result => {
      expect(result[0].name).toEqual('john smith');
      done();
    });

    controller
        .expectOne('https://randomuser.me/api/?results=5')
        .flush({ results: [{ name: { first: 'john', last: 'smith' } }] });
  });
});
