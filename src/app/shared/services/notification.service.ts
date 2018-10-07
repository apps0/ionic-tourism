import { Injectable } from "@angular/core";
import { AngularFireMessaging } from "@angular/fire/messaging";
import { AngularFireFunctions } from "@angular/fire/functions";
import { ToastController } from "@ionic/angular";
import { tap, take } from "rxjs/operators";

// Import firebase to fix temporary bug in AngularFire
import * as app from "firebase";
import { BehaviorSubject } from "rxjs";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  token;
  constructor(
    private userService: UserService,
    private angularFireMessaging: AngularFireMessaging,
    private fun: AngularFireFunctions,
    public toastController: ToastController
  ) {
    this.angularFireMessaging.messaging.subscribe(_messaging => {
      _messaging.onMessage = _messaging.onMessage.bind(_messaging);
      _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
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
  /**
   * update token in firebase database
   *
   * @param userId userId as a key
   * @param token token as a value
   */
  updateToken(token) {
    this.token = token;
    // we can change this function to request our backend service
    const user = this.userService.userSubject.value;
    console.log(user);
    this.userService.updateDoc({ ...user, DeviceToken: token }, user.Id);
  }

  /**
   * request permission for notification from firebase cloud messaging
   *
   * @param userId userId
   */
  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      token => {
        console.log(token);
        this.updateToken(token);
      },
      err => {
        console.error("Unable to get permission to notify.", err);
      }
    );
  }

  /**
   * hook method when new notification received in foreground
   */
  showMessages() {
    return this.angularFireMessaging.messages;
  }

  sub(topic) {
    this.fun
      .httpsCallable("subscribeToTopic")({ topic, token: this.token })
      .pipe(tap(_ => this.presentToast(`subscribed to ${topic}`)))
      .subscribe();
  }
}
