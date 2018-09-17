import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  Input
} from "@angular/core";
import { PlaceService } from "../../services/place.service";
import { ToastController, LoadingController } from "@ionic/angular";
import { catchError } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-places",
  templateUrl: "./places.component.html",
  styleUrls: ["./places.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlacesComponent implements OnInit {
  @Input("enableSelection") enableSelection:boolean=false;
  data$: BehaviorSubject<any> = new BehaviorSubject({ loading: true });
  @Output("onSelect")
  selectEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private placesService: PlaceService,
    public loadingController: LoadingController,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.placesService
      .get()
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

  onSelect(place) {
    this.selectEvent.emit(place);
  }
  onSearch(value) {
    this.placesService
      .search(value)
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
}
