import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { TabsPage } from "./tabs.page";

import { BookTripPage } from "../book-trip/book-trip.page";
import { ViewPlacesPage } from "../view-places/view-places.page";
import { TripHistoryPage } from "../trip-history/trip-history.page";
import { SettingsPage } from "../settings/settings.page";

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "book",
        outlet: "book",
        component: BookTripPage
      },
      {
        path: "places",
        outlet: "places",
        component: ViewPlacesPage
      },
      {
        path: "trip-history",
        outlet: "trip-history",
        component: TripHistoryPage
      },
      {
        path: "settings",
        outlet: "settings",
        component: SettingsPage
      },
      {
        path: "",
        redirectTo: "/user/tabs/(book:book)",
        pathMatch: "full"
      }
    ]
  },
  {
    path: '',
    redirectTo: '/user/tabs/(book:book)',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
