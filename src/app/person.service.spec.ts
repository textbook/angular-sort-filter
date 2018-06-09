import { TestBed } from '@angular/core/testing';

import { PersonService } from './person.service';

describe('PersonService', () => {
  let service: PersonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonService]
    });
    service = TestBed.get(PersonService);
  });

  it('should return a list of people', (done: DoneFn) => {
    service.getData().subscribe(people => {
      expect(people).toEqual([{ name: 'Charlie' }, { name: 'Angela' }, { name: 'Barry' }]);
      done();
    });
  });
});
