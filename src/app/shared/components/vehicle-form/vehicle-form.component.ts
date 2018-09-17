import { Component, OnInit, ViewChild } from "@angular/core";
import {
  ModalController,
  ToastController,
  LoadingController
} from "@ionic/angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Vehicle } from "../../models/vehicle";
import { VehicleService } from "../../services/vehicle.service";
import { ImageDirective } from "../../image.directive";
import { AngularFireStorage, AngularFireUploadTask } from "angularfire2/storage";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-vehicle-form",
  templateUrl: "./vehicle-form.component.html",
  styleUrls: ["./vehicle-form.component.scss"]
})
export class VehicleFormComponent implements OnInit {

  @ViewChild(ImageDirective)
  appImage: ImageDirective;
  providerId: string;
  registerForm: FormGroup;
  loading;
  constructor(
    public modalController: ModalController,
    private fb: FormBuilder,
    public toastController: ToastController,
    private vehicleService: VehicleService,
    public loadingController: LoadingController,
    private storage: AngularFireStorage,
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  onClose() {
    this.modalController.dismiss();
  }

  async onImageSelect(e: AngularFireUploadTask) {
    const loading = await this.loadingController.create({
      content: "Uploading..."
    });
    await loading.present();
    e.then(
      res => {
        loading.dismiss();
        this.presentToast("Image uploaded successfully .");
        if (res) {
          this.registerForm.get("imagePath").setValue(res.ref.fullPath);
          console.log(res);
          e.snapshotChanges()
            .pipe(
              finalize(() => {
                this.storage
                  .ref(res.ref.fullPath)
                  .getDownloadURL()
                  .subscribe(res => {
                    this.registerForm.get("imageUrl").setValue(res);
                  });
              })
            ).subscribe();
        }
      },
      err => {
        console.log(err);
        this.presentToast("Sorry something went wrong .");
        loading.dismiss();
      }
    ).catch(err => {
      console.log(err);
      this.presentToast("Sorry something went wrong .");
      loading.dismiss();
    });
  }
  onImageError(e) {
    console.log(e);
    this.presentToast("Sorry something went wrong .");
  }


  createForm() {
    this.registerForm = this.fb.group({
      vehicleName: ["", Validators.required],
      seatingCapacity: ["", Validators.required],
      charge: ["", Validators.required],
      facilities: ["", Validators.required],
      imagePath: ["", Validators.required],
      imageUrl: ["", Validators.required]
    });
  }

  prepareSaveInfo() {
    const formModel = this.registerForm.value;

    let data: Vehicle = {
      Name: formModel.vehicleName as string,
      SeatingCapacity: formModel.seatingCapacity as string,
      Charge: formModel.charge as string,
      Facilities: formModel.facilities as string,
      ImageUrl: formModel.imageUrl as string,
      ImagePath: formModel.imagePath as string
    };

    return data;
  }

  onRegister() {
    if (this.registerForm.valid) {
      // this.presentLoading(true);
      let data: Vehicle = this.prepareSaveInfo();
      data.ProviderId = this.providerId;
      this.presentLoading(true);
      this.vehicleService
        .register(data)
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
