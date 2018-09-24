import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VerifyPlacesPage } from './verify-places.page';
import { SharedModule } from '../../shared';

const routes: Routes = [
  {
    path: '',
    component: VerifyPlacesPage
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
  declarations: [VerifyPlacesPage]
})
export class VerifyPlacesPageModule {}
