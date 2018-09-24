import { Component, OnInit, Input } from "@angular/core";
import { coerceBooleanProperty } from "../../helper";
import { PlaceService } from "../../services/place.service";

@Component({
  selector: "place-card",
  templateUrl: "./place-card.component.html",
  styleUrls: ["./place-card.component.scss"]
})
export class PlaceCardComponent implements OnInit {
  @Input("data")
  place;
  @Input()
  mini: boolean = false;

  @Input()
  get fetch(): boolean {
    return this._fetch;
  }
  set fetch(value: boolean) {
    this._fetch = coerceBooleanProperty(value);
  }
  private _fetch = false;

  @Input()
  get reviewWrite(): boolean {
    return this._reviewWrite;
  }
  set reviewWrite(value: boolean) {
    this._reviewWrite = coerceBooleanProperty(value);
  }
  private _reviewWrite = false;

  constructor(private placeService: PlaceService) {}

  ngOnInit() {
    console.log(this.place);
    if (this._fetch) {
      //get latest
      this.placeService.getById(this.place.Id).subscribe(res => {
        this.place = res;
      });
    }
  }
  getAvgRating(reviewItem) {
    return reviewItem.TotalRatings || reviewItem.ReviewCount
      ? Math.floor(reviewItem.TotalRatings / reviewItem.ReviewCount)
      : 0;
  }
}
