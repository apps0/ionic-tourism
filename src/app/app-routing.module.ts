import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FnaTypeResolver } from "./register-fna/fna-type.resolver";
import { TripResolver } from "./view-trip/trip.resolver";

const routes: Routes = [
  { path: "login", loadChildren: "./login/login.module#LoginModule" },
  { path: "about", loadChildren: "./about/about.module#AboutPageModule" },
  { path: "home", loadChildren: "./home/home.module#HomePageModule" },
  { path: "", pathMatch: "full", redirectTo: "home" },
  {
    path: "register",
    loadChildren: "./register/register.module#RegisterPageModule"
  },
  { path: "admin", loadChildren: "./admin/admin.module#AdminPageModule" },
  {
    path: "signup-options",
    loadChildren:
      "./signup-options/signup-options.module#SignupOptionsPageModule"
  },

  {
    path: "register-place",
    loadChildren:
      "./register-place/register-place.module#RegisterPlacePageModule"
  },
  {
    path: "register-user",
    loadChildren: "./register-user/register-user.module#RegisterUserPageModule"
  },
  {
    path: "vehicle-list-form",
    loadChildren:
      "./vehicle-list-form/vehicle-list-form.module#VehicleListFormPageModule"
  },
  {
    path: "book-trip",
    loadChildren: "./book-trip/book-trip.module#BookTripPageModule"
  },
  {
    path: "register-companion",
    loadChildren:
      "./register-companion/register-companion.module#RegisterCompanionPageModule"
  },
  {
    path: "register-fna/:id",
    loadChildren: "./register-fna/register-fna.module#RegisterFnaPageModule",
    resolve: {
      fnaType: FnaTypeResolver
    }
  },
  {
    path: "register-vehicle-provider",
    loadChildren:
      "./register-vehicle-provider/register-vehicle-provider.module#RegisterVehicleProviderPageModule"
  },
  {
    path: "register-vehicles/:id",
    loadChildren:
      "./register-vehicles/register-vehicles.module#RegisterVehiclesPageModule"
  },
  {
    path: "view-places",
    loadChildren: "./view-places/view-places.module#ViewPlacesPageModule"
  },
  {
    path: "view-place-details",
    loadChildren:
      "./view-place-details/view-place-details.module#ViewPlaceDetailsPageModule"
  },

  { path: "user", loadChildren: "./tabs/tabs.module#TabsPageModule" },
  {
    path: "register-fna-type",
    loadChildren:
      "./register-fna-type/register-fna-type.module#RegisterFnaTypePageModule"
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
  { path: 'verify-user/:role', loadChildren: './verify-user/verify-user.module#VerifyUserPageModule' },  { path: 'verify-places', loadChildren: './verify-places/verify-places.module#VerifyPlacesPageModule' },



];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
