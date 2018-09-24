import { Directive, Input, HostListener } from "@angular/core";
import { ReviewComponent } from "./review.component";
import { ModalController } from "@ionic/angular";

@Directive({
  selector: "[reviewModal]"
})
export class ReviewModalDirective {
  @Input("reviewItemId")
  reviewItemId;
  @Input("reviewItemType")
  reviewItemType;
  @Input("disableWrite")
  disableWrite: boolean = true;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit(): void {}

  @HostListener("click")
  async openReviewModal() {
    const modal = await this.modalCtrl.create({
      component: ReviewComponent,
      componentProps: {
        reviewItemId: this.reviewItemId,
        reviewItemType: this.reviewItemType,
        disableWrite: this.disableWrite
      }
    });
    return await modal.present();
  }
}
