import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { catchError, map } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-view-trip",
  templateUrl: "./view-trip.page.html",
  styleUrls: ["./view-trip.page.scss"]
})
export class ViewTripPage implements OnInit {
  data$: BehaviorSubject<any> = new BehaviorSubject({ loading: true });
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data
      .pipe(
        catchError(err => {
          this.data$.next({ error: true });
          return err;
        }),
        map(x => x["trip"])
      )
      .subscribe(res => {
        console.log(res);
        if (res) this.data$.next({ data: res });
        else this.data$.next({ empty: true });
      });
  }
}
