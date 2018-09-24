import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FnaTypeResolver } from "./register-fna/fna-type.resolver";

const routes: Routes = [
  { path: "login", loadChildren: "./login/login.module#LoginModule" },
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
    path: "register-user",
    loadChildren: "./register-user/register-user.module#RegisterUserPageModule"
  },
  {
    path: "signup-options",
    loadChildren:
      "./signup-options/signup-options.module#SignupOptionsPageModule"
  },
  { path: "", pathMatch: "full", redirectTo: "/auth/signup-options" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: []
})
export class AuthModule {}
