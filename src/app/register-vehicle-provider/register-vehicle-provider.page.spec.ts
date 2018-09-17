import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterVehicleProviderPage } from './register-vehicle-provider.page';

describe('RegisterVehicleProviderPage', () => {
  let component: RegisterVehicleProviderPage;
  let fixture: ComponentFixture<RegisterVehicleProviderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterVehicleProviderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterVehicleProviderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
