import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show the title', () => {
    expect(fixture.nativeElement.querySelector('h1').textContent)
        .toEqual('Angular Sorting and Filtering');
  });

  it('should show the people component', () => {
    expect(fixture.nativeElement.querySelector('asf-people'))
        .not.toBeNull('people component not shown');
  });
});
