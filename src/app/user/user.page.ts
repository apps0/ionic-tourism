import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { Router } from "@angular/router";
import { take, finalize } from "rxjs/operators";
import { UserService } from "../shared/services/user.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.page.html",
  styleUrls: ["./user.page.scss"]
})
export class UserPage implements OnInit {
  
  constructor(
    public authService: UserService,
    private router: Router,
    public loadingController: LoadingController
  ) {}

  ngOnInit() {}

  async logOut() {
    this.authService.logOut();
  }
}
