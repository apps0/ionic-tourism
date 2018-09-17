import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-vehicle-list-form',
  templateUrl: './vehicle-list-form.page.html',
  styleUrls: ['./vehicle-list-form.page.scss'],
})
export class VehicleListFormPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  // async presentModal() {
  //   const modal = await this.modalController.create({
  //     component: ,
  //     componentProps: { value: 123 }
  //   });
  //   return await modal.present();
  // }

}
