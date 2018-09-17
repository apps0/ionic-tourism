import { Component, OnInit } from "@angular/core";
import { ModalController, LoadingController, ToastController } from "@ionic/angular";
import { BehaviorSubject } from "rxjs";
import { UserService } from "../../services/user.service";
import { catchError } from "rxjs/operators";
import { VehicleService } from "../../services/vehicle.service";

@Component({
  selector: "app-select-vehicle",
  templateUrl: "./select-vehicle.component.html",
  styleUrls: ["./select-vehicle.component.scss"]
})
export class SelectVehicleComponent implements OnInit {
  data$: BehaviorSubject<any> = new BehaviorSubject({ loading: true });
  
  constructor(
    public modalController: ModalController,
    private vehicleService: VehicleService,
    public loadingController: LoadingController,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.vehicleService
      .getVehicles()
      .pipe(
        catchError(err => {
          this.data$.next({ error: true });
          return err;
        })
      )
      .subscribe(res => {
        this.data$.next({ data: res });
        console.log(res);
      });
  }

  onSelect(data) {
    this.modalController.dismiss(data);
  }
  onCancel() {
    this.modalController.dismiss();
  }
}
