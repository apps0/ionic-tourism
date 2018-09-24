import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "register-place",
    loadChildren:
      "./register-place/register-place.module#RegisterPlacePageModule"
  },
  {
    path: "view-places",
    loadChildren: "./view-places/view-places.module#ViewPlacesPageModule"
  },
  {
    path: "review",
    loadChildren: "./review/review.module#ReviewModule"
  },
  {
    path: "view-place-details",
    loadChildren:
      "./view-place-details/view-place-details.module#ViewPlaceDetailsPageModule"
  },
  { path: "home", loadChildren: "./home/home.module#HomePageModule" },
  { path: "auth", loadChildren: "./auth/auth.module#AuthModule" },
  { path: "admin", loadChildren: "./admin/admin.module#AdminPageModule" },
  { path: "user", loadChildren: "./user/user.module#UserPageModule" },
  { path: "", pathMatch: "full", redirectTo: "home" }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
