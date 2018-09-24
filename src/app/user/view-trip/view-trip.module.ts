import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewTripPage } from './view-trip.page';
import { SharedModule } from '../../shared';

const routes: Routes = [
  {
    path: '',
    component: ViewTripPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewTripPage]
})
export class ViewTripPageModule {}
