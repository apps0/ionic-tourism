import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BookTripPage } from './book-trip.page';
import { ComponentsModule, SharedModule } from '../../shared';

const routes: Routes = [
  {
    path: '',
    component: BookTripPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BookTripPage]
})
export class BookTripPageModule {}
