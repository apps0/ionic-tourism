import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { ComponentsModule } from "./components/components.module";
import { FirebaseImageModule } from "./features/firebase-image/firebase-image.module";

const MODS = [CommonModule, ComponentsModule, FirebaseImageModule];

@NgModule({
  imports: [...MODS],
  declarations: [],
  exports: [...MODS]
})
export class SharedModule {}
