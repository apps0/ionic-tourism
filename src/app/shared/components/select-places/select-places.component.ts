import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-select-places',
  templateUrl: './select-places.component.html',
  styleUrls: ['./select-places.component.scss']
})
export class SelectPlacesComponent implements OnInit {

  constructor(
    public modalController: ModalController,
  ) {}

  ngOnInit() {}
  onCancel() {
    this.modalController.dismiss();
  }

  onPlaceSelect($event){
    this.modalController.dismiss($event);
  }
}
