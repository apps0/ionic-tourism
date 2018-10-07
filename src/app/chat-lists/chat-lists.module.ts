import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChatListsPage } from './chat-lists.page';
import { SharedModule } from '../shared';

const routes: Routes = [
  {
    path: '',
    component: ChatListsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [ChatListsPage]
})
export class ChatListsPageModule {}
