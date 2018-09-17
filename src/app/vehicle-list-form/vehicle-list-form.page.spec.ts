import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleListFormPage } from './vehicle-list-form.page';

describe('VehicleListFormPage', () => {
  let component: VehicleListFormPage;
  let fixture: ComponentFixture<VehicleListFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleListFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleListFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
