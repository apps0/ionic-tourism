import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FnaTripsPage } from './fna-trips.page';

const routes: Routes = [
  {
    path: '',
    component: FnaTripsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FnaTripsPage]
})
export class FnaTripsPageModule {}
