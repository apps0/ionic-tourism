import { Component, OnInit } from "@angular/core";

import { Platform, ToastController } from "@ionic/angular";
import { NotificationService } from "./shared/services/notification.service";
import { UserService } from "./shared/services/user.service";
import { filter } from "rxjs/operators";
// import { SplashScreen } from '@ionic-native/splash-screen';
// import { StatusBar } from '@ionic-native/status-bar';

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
  message;

  constructor(
    private platform: Platform,
    private messagingService: NotificationService,
    private userService: UserService,
    public toastController: ToastController
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.userService.isLoggedIn$
    .pipe(filter(x=>x))
    .subscribe((res)=>{
      this.messagingService.requestPermission();
      this.messagingService.showMessages().subscribe((res)=>{
        console.log(res);
        const body: any = (res as any).notification.body;
        const from: any = (res as any).notification.title;
        this.presentToast(`From ${from} : ${body}`);
      })
    })
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
    });
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: "top"
    });
    toast.present();
  }
}
