import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;
import { of } from 'rxjs';

import { PeopleComponent } from './people.component';
import { Person, PersonService } from '../person.service';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;
  let service: SpyObj<PersonService>;

  const people: Person[] = [
      { name: 'Charlie', nationality: 'French' },
      { name: 'Angela', nationality: 'German' },
      { name: 'Barry', nationality: 'German' },
  ];

  beforeEach(async(() => {
    service = createSpyObj('PersonService', ['getData']);
    service.getData.and.returnValue(of(people));

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

  describe('Refresh button', () => {
    it('should allow the user to fetch a new list', () => {
      service.getData.calls.reset();

      getButton('Refresh').click();
      fixture.detectChanges();

      expect(service.getData).toHaveBeenCalled();
    });

    it('should reset the sorting', () => {
      service.getData.and.returnValue(of([{ name: 'Ellie' }, { name: 'Dana' }]));

      getButton('Sort').click();
      fixture.detectChanges();

      getButton('Refresh').click();
      fixture.detectChanges();

      expect(getNames()).toEqual(['Ellie', 'Dana']);
    });

    it('should reset the filtering', () => {
      service.getData.and.returnValue(of([
        { name: 'Ellie', nationality: 'French' },
        { name: 'Dana', nationality: 'German' },
      ]));

      getButton('Filter French').click();
      fixture.detectChanges();

      getButton('Refresh').click();
      fixture.detectChanges();

      expect(getNames()).toEqual(['Ellie', 'Dana']);
    });
  });

  describe('Sort button', () => {
    it('should allow the user to sort by name', () => {
      getButton('Sort').click();
      fixture.detectChanges();

      expect(getNames()).toEqual(['Angela', 'Barry', 'Charlie']);
    });

    it('should disable itself', () => {
      getButton('Sort').click();
      fixture.detectChanges();

      expect(getButton('Sort').hasAttribute('disabled')).toBe(true);
    });
  });

  describe('Filter buttons', () => {
    it('should allow the user to filter by nationality', () => {
      const frenchButton = getButton('Filter French');
      const germanButton = getButton('Filter German');

      frenchButton.click();
      fixture.detectChanges();

      expect(getNames()).toEqual(['Charlie']);
      expect(frenchButton.hasAttribute('disabled')).toBe(true);

      germanButton.click();
      fixture.detectChanges();

      expect(getNames()).toEqual(['Angela', 'Barry']);
      expect(germanButton.hasAttribute('disabled')).toBe(true);
    });
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
