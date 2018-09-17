import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseImageDirective } from './firebase-image.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FirebaseImageDirective],
  exports:[FirebaseImageDirective]
})
export class FirebaseImageModule { }
