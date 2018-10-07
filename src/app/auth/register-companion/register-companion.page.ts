import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoadingController, ToastController } from "@ionic/angular";
import {
  AngularFireUploadTask,
  AngularFireStorage
} from "@angular/fire/storage";
import { finalize } from "rxjs/operators";
import { ImageDirective } from "../../shared/image.directive";
import { UserService } from "../../shared/services/user.service";
import { User, UserRole } from "../../shared/models";

@Component({
  selector: "app-register-companion",
  templateUrl: "./register-companion.page.html",
  styleUrls: ["./register-companion.page.scss"]
})
export class RegisterCompanionPage implements OnInit {
  @ViewChild(ImageDirective)
  appImage: ImageDirective;
  registerForm: FormGroup;
  loading;
  constructor(
    private fb: FormBuilder,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private userService: UserService,
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
      password: ["", Validators.required],
      gender: ["", Validators.required],
      dob: ["", Validators.required],
      adhaarId: ["", Validators.required],
      adhaarIdDocImagePath: ["", Validators.required],
      adhaarIdDocImageUrl: ["", Validators.required]
    });
  }
  async onAdhaarDocImageSelect(e: AngularFireUploadTask) {
    const loading = await this.loadingController.create({
      content: "Uploading..."
    });
    await loading.present();
    e.then(
      res => {
        loading.dismiss();
        this.presentToast("Image uploaded successfully .");
        if (res) {
          this.registerForm
            .get("adhaarIdDocImagePath")
            .setValue(res.ref.fullPath);
          console.log(res);
          e.snapshotChanges()
            .pipe(
              finalize(() => {
                this.storage
                  .ref(res.ref.fullPath)
                  .getDownloadURL()
                  .subscribe(res => {
                    this.registerForm.get("adhaarIdDocImageUrl").setValue(res);
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
  onAdhaarDocImageError(e) {
    console.log(e);
    this.presentToast("Sorry something went wrong .");
  }
  prepareSaveInfo() {
    const formModel = this.registerForm.value;

    let data: User = {
      FullName: formModel.fullName as string,
      EmailId: formModel.emailId as string,
      PhoneNumber: formModel.phoneNumber as string,
      Password: formModel.password as string,
      Gender: formModel.gender as string,
      DOB: formModel.dob as string,
      AdhaarId: formModel.adhaarId as string,
      AdhaarIdDocImagePath: formModel.adhaarIdDocImagePath as string,
      AdhaarIdDocImageUrl: formModel.adhaarIdDocImageUrl as string
    };

    return data;
  }

  onSave() {
    if (this.registerForm.valid) {
      // this.presentLoading(true);
      let data: User = this.prepareSaveInfo();
      data.Role = UserRole.Companion;
      console.log(data);
      this.presentLoading(true);
      this.userService
        .register(data)
        .then(res => {
          this.presentLoading(false);
          this.presentToast("Registration Successfull .");
          console.log(res);
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
