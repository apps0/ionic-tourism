import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPlacePage } from './register-place.page';

describe('RegisterPlacePage', () => {
  let component: RegisterPlacePage;
  let fixture: ComponentFixture<RegisterPlacePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPlacePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPlacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
