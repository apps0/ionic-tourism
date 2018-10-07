import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComponentsModule } from "./components/components.module";
import { RatingsModule } from "./features/ratings/ratings.module";
import { ReviewModule } from "../review/review.module";
import { ChatPageModule } from "../chat/chat.module";

const MODS = [
  CommonModule,
  ComponentsModule,
  RatingsModule,
  ReviewModule,
  ChatPageModule
];

@NgModule({
  imports: [...MODS],
  declarations: [],
  exports: [...MODS]
})
export class SharedModule {}
