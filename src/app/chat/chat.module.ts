import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChatPage } from './chat.page';
import { ChatModalDirective } from './chat-modal.directive';

// const routes: Routes = [
//   {
//     path: '',
//     component: ChatPage
//   }
// ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // RouterModule.forChild(routes)
  ],
  declarations: [ChatPage,ChatModalDirective],
  entryComponents:[ChatPage],
  exports:[ChatModalDirective]
})
export class ChatPageModule {}
