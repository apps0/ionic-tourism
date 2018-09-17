import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewPlaceDetailsPage } from './view-place-details.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPlaceDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewPlaceDetailsPage]
})
export class ViewPlaceDetailsPageModule {}
