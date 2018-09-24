import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoadingController, ToastController } from "@ionic/angular";
import { finalize } from "rxjs/operators";
import {
  AngularFireUploadTask,
  AngularFireStorage
} from "angularfire2/storage";
import { PlaceService } from "../shared/services/place.service";
import { Place } from "../shared/models/place";

@Component({
  selector: "app-register-place",
  templateUrl: "./register-place.page.html",
  styleUrls: ["./register-place.page.scss"]
})
export class RegisterPlacePage implements OnInit {
  image: any;
  registerForm: FormGroup;
  loading;
  constructor(
    private fb: FormBuilder,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private placeService: PlaceService,
    private storage: AngularFireStorage
  ) {
    this.createForm();
  }

  ngOnInit() {}

  createForm(data: Place = null) {
    this.registerForm = this.fb.group({
      name: [data ? data.Name : null, Validators.required],
      address: [data ? data.Address : null, Validators.required],
      latLng: [data ? data.LatLng : null, Validators.required],
      imagePath: [data ? data.ImagePath : null, Validators.required],
      imageUrl: [data ? data.ImageUrl : null, Validators.required],
      description: [data ? data.Description : null, Validators.required]
    });
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
            )
            .subscribe();
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
  prepareSaveInfo() {
    const formModel = this.registerForm.value;

    let data: Place = {
      Name: formModel.name as string,
      Description: formModel.description as string,
      LatLng: formModel.latLng as string,
      Address: formModel.address as string,
      ImagePath: formModel.imagePath as string,
      ImageUrl: formModel.imageUrl as string
    };

    return data;
  }

  onSave() {
    debugger;
    if (this.registerForm.valid) {
      // this.presentLoading(true);
      let data: Place = this.prepareSaveInfo();
      this.presentLoading(true);
      this.placeService
        .register(data)
        .then(res => {
          this.presentToast("Place registered Successfully.");
          this.presentLoading(false);
          console.log(res);
        })
        .catch(err => {
          this.presentLoading(false);
          console.log(err);
          this.presentToast("Sorry something went wrong.");
        });
    } else {
      this.presentToast("Please fill all the required fields .");
    }
  }
  onLocationSelect(location) {
    if (location) {
      this.registerForm.get("latLng").setValue(JSON.stringify(location));
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
      duration: 2000
    });
    toast.present();
  }
}
