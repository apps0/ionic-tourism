import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { KhMapsModule } from "../libs/kh-maps/src/public_api";
import { environment } from "../environments/environment";

import { AngularFireModule } from "@angular/fire";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireMessagingModule } from "@angular/fire/messaging";
import { Camera } from "@ionic-native/camera/ngx";
import { ServiceWorkerModule, SwUpdate, SwPush } from "@angular/service-worker";
import { AngularFireFunctionsModule } from "@angular/fire/functions";
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    KhMapsModule.forRoot(environment.googleMapApiKey),
    AngularFireModule.initializeApp(environment.firebase, "ionic-tourism"),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireMessagingModule,
    AngularFireFunctionsModule,
    ServiceWorkerModule.register("/ngsw-worker.js", {
      enabled: environment.production
    })
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(update: SwUpdate, push: SwPush) {
    update.available.subscribe(() => {
      console.log("Update available");
    });

    push.messages.subscribe(msg => {
      console.log(msg);
    });
  }
}
