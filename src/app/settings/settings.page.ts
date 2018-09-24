import { Component, OnInit } from "@angular/core";
import { UserService } from "../shared/services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"]
})
export class SettingsPage implements OnInit {
  user;
  constructor(public userService: UserService, private router: Router) {}

  ngOnInit() {
    this.user=this.userService.userSubject.value;
  }

  logOut() {
    this.userService.logOut()
    .subscribe(() => {
      this.router.navigate(["/home"]);
    });
  }
}
