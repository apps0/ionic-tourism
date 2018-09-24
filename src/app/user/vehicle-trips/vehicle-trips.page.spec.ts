import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTripsPage } from './vehicle-trips.page';

describe('VehicleTripsPage', () => {
  let component: VehicleTripsPage;
  let fixture: ComponentFixture<VehicleTripsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleTripsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleTripsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
