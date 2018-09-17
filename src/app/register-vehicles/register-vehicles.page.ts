import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { VehicleFormComponent } from "../shared/components/vehicle-form/vehicle-form.component";
import { Vehicle } from "../shared/models/vehicle";
import { ActivatedRoute } from "@angular/router";
import { VehicleService } from "../shared/services/vehicle.service";
import { BehaviorSubject } from "rxjs";
import { catchError } from "rxjs/operators";

@Component({
  selector: "app-register-vehicles",
  templateUrl: "./register-vehicles.page.html",
  styleUrls: ["./register-vehicles.page.scss"]
})
export class RegisterVehiclesPage implements OnInit {
  data$: BehaviorSubject<any> = new BehaviorSubject({ loading: true });
  providerId: string;
  constructor(
    public modalController: ModalController,
    private route: ActivatedRoute,
    private vehicleService: VehicleService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(param => {
      if (param.id) {
        this.providerId = param.id;
        this.vehicleService
          .getVehiclesByProvider(param.id)
          .pipe(
            catchError(err => {
              this.data$.next({ error: true });
              return err;
            })
          )
          .subscribe(res => {
            if (res && res.length > 0) this.data$.next({ data: res });
            else this.data$.next({ empty: true });
          });
      }
    });
  }

  async registerVehicle() {
    const modal = await this.modalController.create({
      component: VehicleFormComponent,
      componentProps: { providerId: this.providerId }
    });
    return await modal.present();
  }

  onDelete(vehicle) {
    this.vehicleService.delete(vehicle.Id).then(res => {
      console.log(res);
    });
  }
}
