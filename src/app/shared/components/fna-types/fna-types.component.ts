import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { FnaService } from "../../services/fna.service";
import { catchError } from "rxjs/operators";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-fna-types",
  templateUrl: "./fna-types.component.html",
  styleUrls: ["./fna-types.component.scss"]
})
export class FnaTypesComponent implements OnInit {
  data$: BehaviorSubject<any> = new BehaviorSubject({ loading: true });
  @Output("onSelect")
  selectEmitter:EventEmitter<any>=new EventEmitter();
  constructor(private fnaService: FnaService,
  private authService:UserService) {}

  ngOnInit() {
    this.fnaService
      .getTypes()
      .pipe(
        catchError(err => {
          this.data$.next({ error: true });
          return err;
        })
      )
      .subscribe(res => {
        if (res && res.length > 0) this.data$.next({ data: res });
        else this.data$.next({ empty: true });
      });
  }

  onSelect(type) {
    this.selectEmitter.emit(type);
  }
  onDelete(type) {
    this.fnaService.delete(type.Id).then(res => {
      console.log(res);
    });
  }
}
