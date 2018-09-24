import { Component, OnInit, Input } from "@angular/core";
import { coerceBooleanProperty } from "../../helper";
import { VehicleService } from "../../services/vehicle.service";

@Component({
  selector: "vehicle-card",
  templateUrl: "./vehicle-card.component.html",
  styleUrls: ["./vehicle-card.component.scss"]
})
export class VehicleCardComponent implements OnInit {
  @Input("data")
  vehicle;
  @Input()
  mini = false;

  @Input()
  get reviewWrite(): boolean { return this._reviewWrite; }
  set reviewWrite(value: boolean) {
    this._reviewWrite = coerceBooleanProperty(value);
  }
  private _reviewWrite = false;

  @Input()
  get fetch(): boolean { return this._fetch; }
  set fetch(value: boolean) {
    this._fetch = coerceBooleanProperty(value);
  }
  private _fetch = false;

  constructor(private vehicleService:VehicleService) {}

  ngOnInit() {
    console.log(this.vehicle);
    if(this._fetch){
      //get latest
      this.vehicleService.getById(this.vehicle.Id)
      .subscribe((res)=>{
        this.vehicle=res;
      })
    }
  }
  getAvgRating(reviewItem) {
    return reviewItem.TotalRatings || reviewItem.ReviewCount
      ? Math.floor(reviewItem.TotalRatings / reviewItem.ReviewCount)
      : 0;
  }
}
