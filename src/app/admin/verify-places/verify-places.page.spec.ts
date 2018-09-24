import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyPlacesPage } from './verify-places.page';

describe('VerifyPlacesPage', () => {
  let component: VerifyPlacesPage;
  let fixture: ComponentFixture<VerifyPlacesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyPlacesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyPlacesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
