import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanionTripsPage } from './companion-trips.page';

describe('CompanionTripsPage', () => {
  let component: CompanionTripsPage;
  let fixture: ComponentFixture<CompanionTripsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanionTripsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanionTripsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
