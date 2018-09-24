import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoadingController, ToastController } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import {
  AngularFireStorage,
  AngularFireUploadTask
} from "angularfire2/storage";
import { finalize } from "rxjs/operators";
import { UserService } from "../../shared/services/user.service";
import { User, UserRole } from "../../shared/models";

@Component({
  selector: "app-register-fna",
  templateUrl: "./register-fna.page.html",
  styleUrls: ["./register-fna.page.scss"]
})
export class RegisterFnaPage implements OnInit {
  registerForm: FormGroup;
  fnaType;
  loading;
  constructor(
    private fb: FormBuilder,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.route.data.subscribe(res => {
      this.fnaType = res["fnaType"];
      console.log(this.fnaType);
      this.createForm();
    });
  }

  createForm() {
    this.registerForm = this.fb.group({
      fullName: ["", Validators.required],
      emailId: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      licenseId: ["", Validators.required],
      licenseImagePath: ["", Validators.required],
      licenseImageUrl: ["", Validators.required],
      address: ["", Validators.required],
      latLng: ["", Validators.required],
      password: ["", Validators.required],
      fnaDescription: ["", Validators.required]
    });
    if (!this.fnaType.IsLicenseNeeded) {
      this.registerForm.get("licenseId").disable();
      this.registerForm.get("licenseImageUrl").disable();
      this.registerForm.get("licenseImagePath").disable();
    }
  }

  prepareSaveInfo() {
    const formModel = this.registerForm.value;

    let data: User = {
      FullName: formModel.fullName as string,
      EmailId: formModel.emailId as string,
      PhoneNumber: formModel.phoneNumber as string,
      Password: formModel.password as string,
      Address: formModel.address as string,
      LatLng: formModel.latLng as string,
      FnaDescription: formModel.fnaDescription as string
    };

    if (this.fnaType.IsLicenseNeeded) {
      data.LicenseId = formModel.licenseId as string;
      data.LicenseImagePath = formModel.licenseImagePath as string;
      data.LicenseImageUrl = formModel.licenseImageUrl as string;
    }
    return data;
  }

  onRegister() {
    if (this.registerForm.valid) {
      // this.presentLoading(true);
      let data: User = this.prepareSaveInfo();
      data.Role = UserRole.FoodProvider;
      data.FnaType = this.fnaType;
      console.log(data);
      this.presentLoading(true);
      this.userService
        .register(data)
        .then(res => {
          this.presentLoading(false);
          this.presentToast("Registration Successfull.");
          this.router.navigate(["/login"]);
          console.log(res);
        })
        .catch(err => {
          this.presentLoading(false);
          console.log(err);
          this.presentToast("Something went wrong.");
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
      duration: 2000
    });
    toast.present();
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
  onLocationSelect(location) {
    if (location) {
      this.registerForm.get("latLng").setValue(JSON.stringify(location));
    }
  }
}
