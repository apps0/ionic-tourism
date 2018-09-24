import { Component, OnInit, ContentChild, ElementRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, catchError, take } from "rxjs/operators";
import { ReviewService, UserReview } from "./review.service";
import { BehaviorSubject } from "rxjs";
import {
  ModalController,
  ToastController,
  LoadingController
} from "@ionic/angular";
import { UserService } from "../shared/services/user.service";
import { PlaceService } from "../shared/services/place.service";
import { VehicleService } from "../shared/services/vehicle.service";
import { FnaService } from "../shared/services/fna.service";

@Component({
  selector: "app-review",
  templateUrl: "./review.component.html",
  styleUrls: ["./review.component.scss"]
})
export class ReviewComponent implements OnInit {
  reviewItem;

  //for modal
  reviewItemId;
  reviewItemType;

  data$: BehaviorSubject<any> = new BehaviorSubject({ loading: true });
  @ContentChild("content")
  content: ElementRef;
  disableWrite: boolean = true;
  myRating: number = 0;

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private userService: UserService,
    private placeService: PlaceService,
    private vehicleService: VehicleService,
    private fnaService: FnaService,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    // this.route.data.pipe(map(res => res.data)).subscribe(res => {
    //   console.log(res);
    //   this.reviewItem = res;
    //   if (this.user.userSubject.value) {
    //     this.reviewService
    //       .checkIfUserReviewExist(
    //         this.reviewItem.Id,
    //         this.user.userSubject.value.Id
    //       )
    //       .subscribe(res => {
    //         this.disableWrite = res;
    //         this.loadReviews(this.reviewItem.Id);
    //       });
    //   } else {
    //     this.loadReviews(this.reviewItem.Id);
    //   }
    // });
    //for modal specific
    let service = null;
    if (this.reviewItemType === "user") service = this.userService;
    else if (this.reviewItemType === "vehicle") service = this.vehicleService;
    else if (this.reviewItemType === "place") service = this.placeService;
    if (service) {
      service
        .getById(this.reviewItemId)
        .pipe(
          take(1),
          map(data => {
            if (data) {
              return data;
            } else {
              // id not found
              return null;
            }
          })
        )
        .subscribe(res => {
          console.log(res);
          this.reviewItem = res;
          if (this.userService.userSubject.value && !this.disableWrite) {
            this.reviewService
              .checkIfUserReviewExist(
                this.reviewItem.Id,
                this.userService.userSubject.value.Id
              )
              .subscribe(res => {
                this.disableWrite = res;
                this.loadReviews(this.reviewItem.Id);
              });
          } else {
            this.loadReviews(this.reviewItem.Id);
          }
        });
    }
  }
  loadReviews(reviewItemId) {
    this.reviewService
      .getReviews(reviewItemId)
      .pipe(
        catchError(err => {
          this.data$.next({ error: true });
          return err;
        })
      )
      .subscribe(res => {
        if (res && res.length > 0) this.data$.next({ data: res });
        else this.data$.next({ empty: true });
        console.log(res);
      });
  }
  getAvgRating() {
    return this.reviewItem &&
      this.reviewItem.TotalRatings &&
      this.reviewItem.ReviewCount
      ? Math.floor(this.reviewItem.TotalRatings / this.reviewItem.ReviewCount)
      : 0;
  }
  async onSubmit(message) {
    const loading = await this.loadingController.create({
      content: "Processing..."
    });
    loading.present();
    const review:UserReview = {
      ReviewItem: this.reviewItem,
      ReviewText: message,
      Rating: this.myRating,
      User: this.userService.userSubject.value
    };
    this.reviewService.sendReview(review,this.reviewItemType).then(
      () => {
        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
        this.presentToast("Sorry , something went wrong");
      }
    );
  }

  onRating(res) {
    this.myRating = res.rating;
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
  onCancel() {
    this.modalController.dismiss();
  }
}
