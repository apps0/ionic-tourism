import { NgModule } from "@angular/core";
import { ReviewComponent } from "./review.component";
import { Routes, RouterModule } from "@angular/router";
import { ReviewResolver } from "./review-resolver";
import { SharedModule } from "../shared";
import { IonicModule } from "@ionic/angular";
import { RatingsModule } from "../shared/features/ratings/ratings.module";
import { ReviewModalDirective } from "./review-modal.directive";
import { CommonModule } from "@angular/common";

const routes: Routes = [
  {
    path: ":id/:reviewItem",
    component: ReviewComponent,
    resolve: {
      data: ReviewResolver
    }
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild(routes),
    RatingsModule
  ],
  declarations: [ReviewComponent, ReviewModalDirective],
  exports: [ReviewModalDirective],
  entryComponents: [ReviewComponent]
})
export class ReviewModule {}
