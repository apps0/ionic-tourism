import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportingFormComponent } from './reporting-form/reporting-form.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GoogleMapsComponent } from './google-maps/google-maps.component';
import { LocationModalComponent } from './location-modal/location-modal.component';
import { KhMapsModule } from '../../../libs/kh-maps/src/public_api';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    KhMapsModule
  ],
  declarations: [ReportingFormComponent,GoogleMapsComponent, LocationModalComponent],
  exports:[ReportingFormComponent,GoogleMapsComponent,LocationModalComponent],
  entryComponents:[ReportingFormComponent,LocationModalComponent]
})
export class ComponentsModule { }
