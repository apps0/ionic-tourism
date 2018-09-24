import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { UserPage } from "./user.page";
import { TripResolver } from "./view-trip/trip.resolver";

const routes: Routes = [
  {
    path: "",
    component: UserPage
  },
  {
    path: "trip-history",
    loadChildren: "./trip-history/trip-history.module#TripHistoryPageModule"
  },
  {
    path: "view-trip/:id",
    loadChildren: "./view-trip/view-trip.module#ViewTripPageModule",
    resolve: {
      trip: TripResolver
    }
  },
  {
    path: "vehicle-trips",
    loadChildren: "./vehicle-trips/vehicle-trips.module#VehicleTripsPageModule"
  },
  {
    path: "register-vehicles/:id",
    loadChildren:
      "./register-vehicles/register-vehicles.module#RegisterVehiclesPageModule"
  },
  {
    path: "book-trip",
    loadChildren: "./book-trip/book-trip.module#BookTripPageModule"
  },

  {
    path: "fna-trips",
    loadChildren: "./fna-trips/fna-trips.module#FnaTripsPageModule"
  },
  {
    path: "companion-trips",
    loadChildren:
      "./companion-trips/companion-trips.module#CompanionTripsPageModule"
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserPage]
})
export class UserPageModule {}
