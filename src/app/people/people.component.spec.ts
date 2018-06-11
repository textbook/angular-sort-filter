import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;
import { of } from 'rxjs';

import { PeopleComponent } from './people.component';
import { PersonService } from '../person.service';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;
  let service: SpyObj<PersonService>;

  beforeEach(async(() => {
    service = createSpyObj('PersonService', ['getData']);
    service.getData.and.returnValue(of([
      { name: 'Charlie' },
      { name: 'Angela' },
      { name: 'Barry' },
    ]));

    TestBed.configureTestingModule({
      declarations: [PeopleComponent],
      providers: [{ provide: PersonService, useValue: service }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show the list of people', () => {
    expect(getNames()).toEqual(['Charlie', 'Angela', 'Barry']);
  });

  it('should allow the user to fetch a new list', () => {
    service.getData.calls.reset();

    getButton('Refresh').click();
    fixture.detectChanges();

    expect(service.getData).toHaveBeenCalled();
  });

  it('should allow the user to sort by name', () => {
    getButton('Sort').click();
    fixture.detectChanges();

    expect(getNames()).toEqual(['Angela', 'Barry', 'Charlie']);
  });

  function getButton(text: string): HTMLButtonElement {
    return Array
        .from(fixture.nativeElement.querySelectorAll('button') as HTMLButtonElement[])
        .filter(el => el.textContent.trim() === text)[0];
  }

  function getNames() {
    return Array
        .from(fixture.nativeElement.querySelectorAll('li'))
        .map((el: HTMLElement) => el.textContent.trim());
  }
});
