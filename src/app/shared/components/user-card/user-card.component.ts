import { Component, OnInit, Input } from "@angular/core";
import { UserRole, User } from "../../models";
import { coerceBooleanProperty } from "../../helper";
import { UserService } from "../../services/user.service";

@Component({
  selector: "user-card",
  templateUrl: "./user-card.component.html",
  styleUrls: ["./user-card.component.scss"]
})
export class UserCardComponent implements OnInit {
  userRoles = UserRole;
  userImage: string = "/assets/user.png";
  @Input()
  get mini(): boolean {
    return this._mini;
  }
  set mini(value: boolean) {
    this._mini = coerceBooleanProperty(value);
  }
  private _mini = false;
  @Input()
  get chat(): boolean {
    return this._chat;
  }
  set chat(value: boolean) {
    this._chat = coerceBooleanProperty(value);
  }
  private _chat = false;
  @Input()
  get noReview(): boolean {
    return this._noReview;
  }
  set noReview(value: boolean) {
    this._noReview = coerceBooleanProperty(value);
  }
  private _noReview = false;

  @Input("data")
  user: User;
  @Input()
  get reviewWrite(): boolean {
    return this._reviewWrite;
  }
  set reviewWrite(value: boolean) {
    this._reviewWrite = coerceBooleanProperty(value);
  }
  private _reviewWrite = false;

  @Input()
  get fetch(): boolean {
    return this._fetch;
  }
  set fetch(value: boolean) {
    this._fetch = coerceBooleanProperty(value);
  }
  private _fetch = false;
  constructor(private userService: UserService) {}

  ngOnInit() {
    //add image icons
    if (this.user.Role === UserRole.Companion) {
      this.userImage =
        this.user.Gender === "female"
          ? "/assets/companion-female.jpg"
          : "/assets/companion-male.jpg";
    } else if (this.user.Role === UserRole.FoodProvider) {
      this.userImage = "/assets/fna.jpg";
    }

    //load latest
    if (this._fetch) {
      //get latest
      this.userService.getById(this.user.Id).subscribe(res => {
        this.user = res;
      });
    }
  }
  getAvgRating(reviewItem) {
    return reviewItem.TotalRatings || reviewItem.ReviewCount
      ? Math.floor(reviewItem.TotalRatings / reviewItem.ReviewCount)
      : 0;
  }
}
