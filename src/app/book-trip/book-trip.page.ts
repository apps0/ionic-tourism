import { Component, OnInit } from "@angular/core";
import {
  ModalController,
  LoadingController,
  ToastController
} from "@ionic/angular";
import { SelectVehicleComponent } from "../shared/components/select-vehicle/select-vehicle.component";
import { SelectFnaComponent } from "../shared/components/select-fna/select-fna.component";
import { SelectCompanionComponent } from "../shared/components/select-companion/select-companion.component";
import { SelectPlacesComponent } from "../shared/components/select-places/select-places.component";
import { Place } from "../shared/models/place";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { TripService } from "../shared/services/trip.service";
import { UserService } from "../shared/services/user.service";

@Component({
  selector: "app-book-trip",
  templateUrl: "./book-trip.page.html",
  styleUrls: ["./book-trip.page.scss"]
})
export class BookTripPage implements OnInit {
  selectedPlace: Place = null;
  selectedCompanion: any = null;
  selectedVehicle: any = null;
  selectedFna: any = null;
  registerForm: FormGroup;
  loading;
  user;
  constructor(
    private fb: FormBuilder,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private tripService: TripService,
    private userService: UserService,
    public modalController: ModalController
  ) {
    this.createForm();
    this.userService.currentUser$.subscribe(user => (this.user = user));
  }

  ngOnInit() {}

  createForm() {
    this.registerForm = this.fb.group({
      startDate: ["", Validators.required],
      endDate: ["", Validators.required],
      totalMembers: ["", Validators.required],
      latLng: ["", Validators.required],
      fromAddress: ["", Validators.required],
      isCompanionSelected: ["", Validators.required],
      isFnaSelected: ["", Validators.required],
      isPlaceSelected: ["", Validators.required],
      isVehicleSelected: ["", Validators.required]
    });
  }

  onLocationSelect(location) {
    if (location) {
      this.registerForm.get("latLng").setValue(JSON.stringify(location));
    }
  }
  
  prepareSaveInfo() {
    const formModel = this.registerForm.value;

    let data: any = {
      StartDate: formModel.startDate,
      EndDate: formModel.endDate,
      TotalMembers: formModel.totalMembers as number,
      LatLng: formModel.latLng as string,
      FromAddress: formModel.fromAddress as string
    };
    if (this.selectedCompanion)
      data.Companion = {
        Id: this.selectedCompanion.Id,
        FullName: this.selectedCompanion.FullName
      };
    if (this.selectedVehicle) {
      data.Vehicle = {
        Id: this.selectedVehicle.Id,
        Name: this.selectedVehicle.Name
      };
    }
    if (this.selectedPlace) {
      data.Place = {
        Id: this.selectedPlace.Id,
        Name: this.selectedPlace.Name
      };
    }
    if (this.selectedFna) {
      data.Fna = {
        Id: this.selectedFna.Id,
        FullName: this.selectedFna.FullName
      };
    }

    if (this.user) data.UserId = this.user.Id;
    return data;
  }

  onSave() {
    if (this.registerForm.valid) {
      // this.presentLoading(true);
      let data = this.prepareSaveInfo();

      console.log(data);
      if (data.UserId) {
        this.presentLoading(true);
        this.tripService
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
        this.presentToast("Login Required .");
      }
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

  async openFoodNAccomodation() {
    const modal = await this.modalController.create({
      component: SelectFnaComponent,
      componentProps: { value: 123 }
    });
    modal.onWillDismiss(res => {
      if (res) {
        this.selectedFna = res.data;
        this.registerForm.get("isFnaSelected").setValue(true);
      }
    });
    return await modal.present();
  }
  async openVehicleList() {
    const modal = await this.modalController.create({
      component: SelectVehicleComponent,
      componentProps: { value: 123 }
    });
    modal.onWillDismiss(res => {
      if (res) {
        this.selectedVehicle = res.data;
        this.registerForm.get("isVehicleSelected").setValue(true);
      }
    });
    return await modal.present();
  }
  async openCompanionList() {
    const modal = await this.modalController.create({
      component: SelectCompanionComponent,
      componentProps: { value: 123 }
    });
    modal.onWillDismiss(res => {
      if (res) {
        this.selectedCompanion = res.data;
        this.registerForm.get("isCompanionSelected").setValue(true);
      }
    });
    return await modal.present();
  }
  async openPlaceList() {
    const modal = await this.modalController.create({
      component: SelectPlacesComponent,
      componentProps: { value: 123 }
    });
    modal.onWillDismiss(res => {
      if (res) {
        this.selectedPlace = res.data;
        this.registerForm.get("isPlaceSelected").setValue(true);
      }
    });
    return await modal.present();
  }
}
