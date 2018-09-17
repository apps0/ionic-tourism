import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewPlacesPage } from './view-places.page';
import { ComponentsModule, SharedModule } from '../shared';

const routes: Routes = [
  {
    path: '',
    component: ViewPlacesPage
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
  declarations: [ViewPlacesPage]
})
export class ViewPlacesPageModule {}
