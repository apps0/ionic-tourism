import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage
  },
  {
    path: "verify-user/:role",
    loadChildren: "./verify-user/verify-user.module#VerifyUserPageModule"
  },
  {
    path: "verify-places",
    loadChildren: "./verify-places/verify-places.module#VerifyPlacesPageModule"
  },
  {
    path: "register-fna-type",
    loadChildren:
      "./register-fna-type/register-fna-type.module#RegisterFnaTypePageModule"
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdminPage]
})
export class AdminPageModule {}
