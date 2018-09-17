import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoadingController, ToastController } from "@ionic/angular";
import { UserService } from "../shared/services/user.service";
import { User, UserRole } from "../shared/models";
import { Vehicle } from "../shared/models/vehicle";
import { Router } from "@angular/router";
import { ImageDirective } from "../shared/image.directive";
import {
  AngularFireUploadTask,
  AngularFireStorage
} from "angularfire2/storage";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-register-vehicle-provider",
  templateUrl: "./register-vehicle-provider.page.html",
  styleUrls: ["./register-vehicle-provider.page.scss"]
})
export class RegisterVehicleProviderPage implements OnInit {
  @ViewChild(ImageDirective)
  appImage: ImageDirective;
  registerForm: FormGroup;
  loading;
  constructor(
    private fb: FormBuilder,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private userService: UserService,
    private router: Router,
    private storage: AngularFireStorage
  ) {
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.registerForm = this.fb.group({
      fullName: ["", Validators.required],
      emailId: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      address: ["", Validators.required],
      licenseId: ["", Validators.required],
      licenseImagePath: ["", Validators.required],
      licenseImageUrl: ["", Validators.required],
      latLng: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  prepareSaveInfo() {
    const formModel = this.registerForm.value;

    let data: User = {
      FullName: formModel.fullName as string,
      EmailId: formModel.emailId as string,
      PhoneNumber: formModel.phoneNumber as string,
      Password: formModel.password as string,
      Address: formModel.address as string,
      LicenseId: formModel.licenseId as string,
      LicenseImagePath: formModel.licenseImagePath as string,
      LicenseImageUrl: formModel.licenseImageUrl as string,
      LatLng: formModel.latLng as string
    };

    return data;
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
          this.registerForm.get("licenseImagePath").setValue(res.ref.fullPath);
          console.log(res);
          e.snapshotChanges()
            .pipe(
              finalize(() => {
                this.storage
                  .ref(res.ref.fullPath)
                  .getDownloadURL()
                  .subscribe(res => {
                    this.registerForm.get("licenseImageUrl").setValue(res);
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
  onRegister() {
    if (this.registerForm.valid) {
      // this.presentLoading(true);
      let data: User = this.prepareSaveInfo();
      data.Role = UserRole.VehicleProvider;
      this.presentLoading(true);
      this.userService
        .register(data)
        .then(res => {
          this.presentLoading(false);
          this.presentToast("Registration Successfull.");
          this.router.navigate(["/login"]);
        })
        .catch(err => {
          this.presentLoading(false);
          console.log(err);
          this.presentToast("Something went wrong .");
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
