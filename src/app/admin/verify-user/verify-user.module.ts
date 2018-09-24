import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VerifyUserPage } from './verify-user.page';
import { SharedModule } from '../../shared';

const routes: Routes = [
  {
    path: '',
    component: VerifyUserPage
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
  declarations: [VerifyUserPage]
})
export class VerifyUserPageModule {}
