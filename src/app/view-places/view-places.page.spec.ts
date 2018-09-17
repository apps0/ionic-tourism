import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPlacesPage } from './view-places.page';

describe('ViewPlacesPage', () => {
  let component: ViewPlacesPage;
  let fixture: ComponentFixture<ViewPlacesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPlacesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPlacesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
