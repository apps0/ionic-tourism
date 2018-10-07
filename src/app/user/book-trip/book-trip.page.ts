import { Component, OnInit } from "@angular/core";
import {
  ModalController,
  LoadingController,
  ToastController
} from "@ionic/angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Place } from "../../shared/models/place";
import { TripService } from "../../shared/services/trip.service";
import { UserService } from "../../shared/services/user.service";
import { SelectFnaComponent } from "../../shared/components/select-fna/select-fna.component";
import { SelectVehicleComponent } from "../../shared/components/select-vehicle/select-vehicle.component";
import { SelectCompanionComponent } from "../../shared/components/select-companion/select-companion.component";
import { SelectPlacesComponent } from "../../shared/components/select-places/select-places.component";
import { Router, NavigationStart, Event } from "@angular/router";

@Component({
  selector: "app-book-trip",
  templateUrl: "./book-trip.page.html",
  styleUrls: ["./book-trip.page.scss"]
})
export class BookTripPage implements OnInit {
  minDate = new Date().toJSON().split("T")[0];
  selectedPlace: Place = null;
  selectedCompanion: any = null;
  selectedVehicle: any = null;
  selectedFna: any = null;
  registerForm: FormGroup;
  loading;
  user;
  submitted = false;
  constructor(
    private fb: FormBuilder,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private tripService: TripService,
    private userService: UserService,
    public modalController: ModalController,
    private router: Router
  ) {
    this.createForm();
    this.userService.currentUser$.subscribe(user => (this.user = user));
  }

  dismissModalOnRouteChange() {
    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        console.log("Navigation started");
        this.modalController.dismiss();
      }
    });
  }
  ngOnInit() {}

  createForm() {
    this.registerForm = this.fb.group(
      {
        startDate: ["", Validators.required],
        endDate: ["", Validators.required],
        totalMembers: ["", Validators.required],
        latLng: ["", Validators.required],
        fromAddress: ["", Validators.required],
        isCompanionSelected: ["", Validators.required],
        isFnaSelected: ["", Validators.required],
        isPlaceSelected: ["", Validators.required],
        isVehicleSelected: ["", Validators.required]
      },
      { validator: this.dateLessThan("startDate", "endDate") }
    );
  }
  dateLessThan(from: string, to: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let s = group.controls[from];
      let e = group.controls[to];
      if (s.value > e.value) {
        return {
          dates: true
        };
      }
      return {};
    };
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
    if (this.selectedCompanion) {
      data.Companion = this.selectedCompanion;
    }
    if (this.selectedVehicle) {
      data.Vehicle = this.selectedVehicle;
    }
    if (this.selectedPlace) {
      data.Place = this.selectedPlace;
    }
    if (this.selectedFna) {
      data.Fna = this.selectedFna;
    }

    if (this.user) {
      data.UserId = this.user.Id;
      data.User = this.user;
    }
    return data;
  }

  async onSave() {
    this.submitted = true;
    if (this.registerForm.valid) {
      const loading = await this.loadingController.create({
        content: "Processing..."
      });
      // this.presentLoading(true);
      let data = this.prepareSaveInfo();

      console.log(data);
      if (data.UserId) {
        loading.present();
        this.tripService
          .register(data)
          .then(res => {
            loading.dismiss();
            this.presentToast("Registration Successfull .");
            this.resetAll();
            console.log(res);
          })
          .catch(err => {
            loading.dismiss();
            console.log(err);
            this.presentToast("Something went wrong .");
          });
      } else {
        this.presentToast("Login Required .");
      }
    } else {
      this.checkFormErrors();
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: "top"
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

  checkFormErrors() {
    let invalidForms = " ";
    Object.keys(this.registerForm.controls).forEach((key: string) => {
      const abstractControl = this.registerForm.controls[key];
      if (abstractControl.invalid) {
        switch (key) {
          case "isCompanionSelected":
            invalidForms += ", Companion";
            break;
          case "isFnaSelected":
            invalidForms += ", Food and Accomodation";
            break;
          case "isPlaceSelected":
            invalidForms += ", Trip Location";
            break;
          case "isVehicleSelected":
            invalidForms += ", Your Vehicle";
            break;
          default:
            break;
        }
      }
    });
    if (invalidForms.trim().length > 0) {
      invalidForms = invalidForms.substr(2);
      this.presentToast(
        `Please select ${invalidForms.substring(
          1,
          invalidForms.length
        )} using the plus button.`
      );
    }
  }

  private resetAll() {
    this.registerForm.reset();
    this.selectedCompanion = null;
    this.selectedVehicle = null;
    this.selectedPlace = null;
    this.selectedFna = null;
    this.submitted = false;
  }
}
