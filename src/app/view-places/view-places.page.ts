import { Component, OnInit, ViewChild } from "@angular/core";
import { PlacesComponent } from "../shared/components/places/places.component";

@Component({
  selector: "app-view-places",
  templateUrl: "./view-places.page.html",
  styleUrls: ["./view-places.page.scss"]
})
export class ViewPlacesPage implements OnInit {
  @ViewChild(PlacesComponent)
  places: PlacesComponent;
  constructor() {}

  ngOnInit() {}
  onSearch(e) {
    if (e["detail"] && e["detail"].value) {
      this.places.onSearch(e["detail"].value);
    }else{
      this.places.ngOnInit();
    }
  }
}
