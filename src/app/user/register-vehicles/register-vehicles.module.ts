import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegisterVehiclesPage } from './register-vehicles.page';
import { ComponentsModule } from '../../shared';

const routes: Routes = [
  {
    path: '',
    component: RegisterVehiclesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegisterVehiclesPage]
})
export class RegisterVehiclesPageModule {}
