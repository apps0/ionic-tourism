import { Component, OnInit } from "@angular/core";
import { UserRole } from "../shared/models";
import { UserService } from "../shared/services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.page.html",
  styleUrls: ["./admin.page.scss"]
})
export class AdminPage implements OnInit {
  vehicleProvider: UserRole = UserRole.VehicleProvider;
  foodProvider: UserRole = UserRole.FoodProvider;
  companion: UserRole = UserRole.Companion;
  constructor(public userService: UserService, private router: Router) {}

  ngOnInit() {}

  logOut() {
    this.userService.logOut().subscribe(() => {
      this.router.navigate(["/home"]);
    });
  }
}
