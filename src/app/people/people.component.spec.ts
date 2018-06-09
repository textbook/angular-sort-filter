import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleComponent } from './people.component';
import { PersonService } from '../person.service';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PeopleComponent],
      providers: [PersonService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show the list of people', () => {
    expect(Array.from(fixture.nativeElement.querySelectorAll('li')).map((el: HTMLElement) => el.textContent))
        .toEqual(['Charlie', 'Angela', 'Barry']);
  });
});
