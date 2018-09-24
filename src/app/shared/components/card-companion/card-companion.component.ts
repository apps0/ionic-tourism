import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "card-companion",
  templateUrl: "./card-companion.component.html",
  styleUrls: ["./card-companion.component.scss"]
})
export class CardCompanionComponent implements OnInit {
  @Input("data")
  user;
  constructor() {}

  ngOnInit() {}

  getAvgRating(data) {
    return data && data.TotalRatings && data.ReviewCount
      ? Math.floor(data.TotalRatings / data.ReviewCount)
      : 0;
  }
}
