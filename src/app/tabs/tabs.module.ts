import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { TabsPageRoutingModule } from "./tabs.router.module";

import { TabsPage } from "./tabs.page";
import { BookTripPageModule } from "../book-trip/book-trip.module";
import { ViewPlacesPageModule } from "../view-places/view-places.module";
import { TripHistoryPageModule } from "../trip-history/trip-history.module";
import { SettingsPageModule } from "../settings/settings.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    BookTripPageModule,
    ViewPlacesPageModule,
    TripHistoryPageModule,
    SettingsPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
