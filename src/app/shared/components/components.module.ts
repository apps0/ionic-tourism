import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReportingFormComponent } from "./reporting-form/reporting-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { GoogleMapsComponent } from "./google-maps/google-maps.component";
import { LocationModalComponent } from "./location-modal/location-modal.component";
import { KhMapsModule } from "../../../libs/kh-maps/src/public_api";
import { UserInfoFormComponent } from "./user-info-form/user-info-form.component";
import { CompanionInfoFormComponent } from "./companion-info-form/companion-info-form.component";
import { VehicleFormComponent } from "./vehicle-form/vehicle-form.component";
import { VehicleProviderInfoFormComponent } from "./vehicle-provider-info-form/vehicle-provider-info-form.component";
import { SelectCompanionComponent } from "./select-companion/select-companion.component";
import { SelectVehicleComponent } from "./select-vehicle/select-vehicle.component";
import { SelectFnaComponent } from "./select-fna/select-fna.component";
import { SelectPlacesComponent } from "./select-places/select-places.component";
import { PlacesComponent } from "./places/places.component";
import { FnaTypesComponent } from "./fna-types/fna-types.component";
import { FnaTypeFormComponent } from "./fna-type-form/fna-type-form.component";
import { LocationDirective } from "../location.directive";
import { ImageDirective } from "../image.directive";

const MODALS = [
  ReportingFormComponent,
  LocationModalComponent,
  SelectCompanionComponent,
  SelectVehicleComponent,
  SelectFnaComponent,
  SelectPlacesComponent,
  VehicleFormComponent,
  PlacesComponent,
  FnaTypesComponent,
  FnaTypeFormComponent
];
const COMPS = [
  GoogleMapsComponent,
  UserInfoFormComponent,
  CompanionInfoFormComponent,
  VehicleProviderInfoFormComponent,
  ...MODALS
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    KhMapsModule
  ],
  declarations: [...COMPS, LocationDirective,ImageDirective],
  exports: [...COMPS, LocationDirective,ImageDirective],
  entryComponents: [...MODALS]
})
export class ComponentsModule {}
