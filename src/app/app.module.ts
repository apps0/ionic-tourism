import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { KhMapsModule } from "../libs/kh-maps/src/public_api";
import { environment } from "../environments/environment";

import { AngularFireModule } from 'angularfire2';
import {AngularFirestoreModule } from 'angularfire2/firestore' ;
import { AngularFireStorageModule } from "angularfire2/storage";
import { Camera } from "@ionic-native/camera/ngx";
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    KhMapsModule.forRoot(environment.googleMapApiKey),
    AngularFireModule.initializeApp(environment.firebase,"ionic-tourism"),
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
