import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFnaTypePage } from './register-fna-type.page';

describe('RegisterFnaTypePage', () => {
  let component: RegisterFnaTypePage;
  let fixture: ComponentFixture<RegisterFnaTypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterFnaTypePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFnaTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
