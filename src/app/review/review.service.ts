import { Injectable } from "@angular/core";
import { User } from "../shared/models/user";
import { Observable, of } from "rxjs";
import { take, map, switchMap } from "rxjs/operators";
import { FirestoreService } from "../shared/services/firestore.service";
import { UserService } from "../shared/services/user.service";
import { PlaceService } from "../shared/services/place.service";
import { VehicleService } from "../shared/services/vehicle.service";

export interface UserReview {
  Id?: string;
  User?: User;
  ReviewItem?: any;
  Rating?: number;
  ReviewText?: boolean;
}

@Injectable({
  providedIn: "root"
})
export class ReviewService {
  collectionName: string = "tourismReviews";

  constructor(private firestoreService: FirestoreService,
    private userService:UserService,
    private placeService:PlaceService,
    private vehicleService:VehicleService
  ) {}

  sendReview(review: UserReview,reviewItemType) {
    const updatedReviewItem = {
      ReviewCount: review.ReviewItem.ReviewCount
        ? review.ReviewItem.ReviewCount + 1
        : 1,
      TotalRatings: review.ReviewItem.TotalRatings
        ? review.ReviewItem.TotalRatings + review.Rating
        : review.Rating
    };

    return this.firestoreService
      .add(`${this.collectionName}`, review)
      .then(() => {

        let service = null;
        if (reviewItemType === "user") service = this.userService;
        else if (reviewItemType === "vehicle") service = this.vehicleService;
        else if (reviewItemType === "place") service = this.placeService;
        if(service){
          service.updateDoc(updatedReviewItem,review.ReviewItem.Id);
        }
      });
  }
  getReviews(ReviewItemId: string): Observable<any> {
    return this.firestoreService.colWithIds$(`${this.collectionName}`, ref => {
      return ref.where("ReviewItem.Id", "==", ReviewItemId).limit(30);
    });
  }
  checkIfUserReviewExist(
    reviewItemId: string,
    userId: string,
    reviewItemType: string = null
  ): Observable<any> {
    return this.firestoreService
      .colWithIds$(`${this.collectionName}`, ref => {
        return ref
          .where("User.Id", "==", userId)
          .where("ReviewItem.Id", "==", reviewItemId);
      })
      .pipe(
        map(res => {
          if (res && res.length > 0) return true;
          return false;
        }),
        switchMap(res => {
          if (res) return of(res);

          //check whether if the review item exists in this users trips

          return of(false);
        })
      );
  }
}
