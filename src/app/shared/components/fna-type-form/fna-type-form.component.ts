import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';
import { FnaService } from '../../services/fna.service';

@Component({
  selector: 'app-fna-type-form',
  templateUrl: './fna-type-form.component.html',
  styleUrls: ['./fna-type-form.component.scss']
})
export class FnaTypeFormComponent implements OnInit {

  registerForm: FormGroup;
  loading;
  constructor(
    public modalController: ModalController,
    private fb: FormBuilder,
    public toastController: ToastController,
    private fnaService: FnaService,
    public loadingController: LoadingController
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  onClose() {
    this.modalController.dismiss();
  }

  createForm() {
    this.registerForm = this.fb.group({
      type: ["", Validators.required],
      description: ["", Validators.required],
      isLicenseNeeded: [true,Validators.required]
    });
  }

  prepareSaveInfo() {
    const formModel = this.registerForm.value;

    let data = {
      Type: formModel.type as string,
      Description: formModel.description as string,
      IsLicenseNeeded: formModel.isLicenseNeeded as string,
    };

    return data;
  }

  onRegister() {
    if (this.registerForm.valid) {
      // this.presentLoading(true);
      let data = this.prepareSaveInfo();
      this.presentLoading(true);
      this.fnaService
        .registerType(data)
        .then(res => {
          this.presentLoading(false);
          this.presentToast("Registration successfull .");
          this.modalController.dismiss();
        })
        .catch(err => {
          this.presentLoading(false);
          this.presentToast("Something went wrong .");
        });
    } else {
      this.presentToast("Please fill all the required fields .");
    }
  }
  async presentLoading(show) {
    if (show) {
      this.loading = await this.loadingController.create({
        content: "Processing..."
      });
      return await this.loading.present();
    } else if (this.loading) {
      return await this.loading.dismiss();
    }
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      cssClass: "modal-toaster"
    });
    toast.present();
  }
}