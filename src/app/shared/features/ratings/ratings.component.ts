import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { coerceBooleanProperty } from "../../helper";

@Component({
  selector: "kh-ratings",
  templateUrl: "./ratings.component.html",
  styleUrls: ["./ratings.component.scss"]
})
export class RatingsComponent implements OnInit {
  @Input()
  rating: number;
  @Input()
  get enable(): boolean { return this._enable; }
  set enable(value: boolean) {
    this._enable = coerceBooleanProperty(value);
  }
  private _enable = false;
  
  @Input()
  itemId: number=Math.floor((Math.random() * 100) + 1);
  @Output("onSelect")
  onSelect: EventEmitter<any> = new EventEmitter<any>();

  inputName: string;
  ngOnInit() {
    this.inputName = this.itemId + "_rating";
  }
  onClick(rating: number): void {
    this.rating = rating;
    this.onSelect.emit({
      itemId: this.itemId,
      rating: rating
    });
  }
}
