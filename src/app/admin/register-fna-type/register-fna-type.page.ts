import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import {  Router } from "@angular/router";
import { UserService } from "../../shared/services/user.service";
import { FnaTypeFormComponent } from "../../shared/components/fna-type-form/fna-type-form.component";

@Component({
  selector: "app-register-fna-type",
  templateUrl: "./register-fna-type.page.html",
  styleUrls: ["./register-fna-type.page.scss"]
})
export class RegisterFnaTypePage implements OnInit {
  constructor(
    public modalController: ModalController,
    private router: Router,
    public authService:UserService
  ) {
    
  }

  ngOnInit() {
  
  }

  async register() {
    const modal = await this.modalController.create({
      component: FnaTypeFormComponent
    });
    return await modal.present();
  }

  onSelect(data) {
    this.router.navigate(["/auth/register-fna/" + data.Id]);
  }
  
}
