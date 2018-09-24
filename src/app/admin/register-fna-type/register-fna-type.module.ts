import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegisterFnaTypePage } from './register-fna-type.page';
import { SharedModule } from '../../shared';

const routes: Routes = [
  {
    path: '',
    component: RegisterFnaTypePage
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
  declarations: [RegisterFnaTypePage]
})
export class RegisterFnaTypePageModule {}
