import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegisterVehicleProviderPage } from './register-vehicle-provider.page';
import { SharedModule } from '../../shared';

const routes: Routes = [
  {
    path: '',
    component: RegisterVehicleProviderPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegisterVehicleProviderPage]
})
export class RegisterVehicleProviderPageModule {}
