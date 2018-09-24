import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoadingController, ToastController } from "@ionic/angular";
import { UserService } from "../../shared/services/user.service";
import { User, UserRole } from "../../shared/models";

@Component({
  selector: "app-register-user",
  templateUrl: "./register-user.page.html",
  styleUrls: ["./register-user.page.scss"]
})
export class RegisterUserPage implements OnInit {
  registerForm: FormGroup;
  loading;
  constructor(
    private fb: FormBuilder,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private userService: UserService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.registerForm = this.fb.group({
      fullName: ["", Validators.required],
      emailId: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  prepareSaveInfo() {
    const formModel = this.registerForm.value;

    let data: User = {
      FullName: formModel.fullName as string,
      EmailId: formModel.emailId as string,
      PhoneNumber: formModel.phoneNumber as string,
      Password: formModel.password as string
    };

    return data;
  }

  onSave() {
    if (this.registerForm.valid) {
      // this.presentLoading(true);
      let data:User = this.prepareSaveInfo();
      data.Role=UserRole.Tourist;
      this.presentLoading(true);
      this.userService.register(data)
      .then((res)=>{
        this.presentLoading(false);
        this.presentToast("Registration successfull ."); 
      })
      .catch((err)=>{
        this.presentLoading(false);
        this.presentToast("Please fill all the required fields .");  
      })
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
