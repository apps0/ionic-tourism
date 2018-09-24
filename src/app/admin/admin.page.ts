import { Component, OnInit } from "@angular/core";
import { UserRole } from "../shared/models";
import { UserService } from "../shared/services/user.service";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { take } from "rxjs/operators";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.page.html",
  styleUrls: ["./admin.page.scss"]
})
export class AdminPage implements OnInit {
  vehicleProvider: UserRole = UserRole.VehicleProvider;
  foodProvider: UserRole = UserRole.FoodProvider;
  companion: UserRole = UserRole.Companion;
  constructor(
    public authService: UserService,
    private router: Router,
    public loadingController: LoadingController
  ) {}

  ngOnInit() {}

  async logOut() {
    const loading = await this.loadingController.create({
      content: "Processing..."
    });
    loading.present();
    this.authService
      .logOut()
      .pipe(take(1))
      .subscribe(res => {
        this.router.navigate(["/home"]).then(() => {
          loading.dismiss();
        });
      });
  }
}
