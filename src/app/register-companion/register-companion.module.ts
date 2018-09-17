import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegisterCompanionPage } from './register-companion.page';
import { SharedModule } from '../shared';

const routes: Routes = [
  {
    path: '',
    component: RegisterCompanionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegisterCompanionPage]
})
export class RegisterCompanionPageModule {}
