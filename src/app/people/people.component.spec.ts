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
    const elements: HTMLElement[] = Array.from(fixture.nativeElement.querySelectorAll('li'));
    expect(elements.map(el => el.textContent)).toEqual(['Charlie', 'Angela', 'Barry']);
  });
});
