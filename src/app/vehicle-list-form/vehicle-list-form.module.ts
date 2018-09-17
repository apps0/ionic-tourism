import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VehicleListFormPage } from './vehicle-list-form.page';

const routes: Routes = [
  {
    path: '',
    component: VehicleListFormPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VehicleListFormPage]
})
export class VehicleListFormPageModule {}
