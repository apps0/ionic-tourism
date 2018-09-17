import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { BehaviorSubject } from "rxjs";
import {
  ModalController,
  LoadingController,
  ToastController
} from "@ionic/angular";
import { catchError } from "rxjs/operators";

@Component({
  selector: "app-select-fna",
  templateUrl: "./select-fna.component.html",
  styleUrls: ["./select-fna.component.scss"]
})
export class SelectFnaComponent implements OnInit {
  data$: BehaviorSubject<any> = new BehaviorSubject({ loading: true });

  constructor(
    public modalController: ModalController,
    public userService: UserService,
    public loadingController: LoadingController,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.userService
      .getFnaList()
      .pipe(
        catchError(err => {
          this.data$.next({ error: true });
          return err;
        })
      )
      .subscribe(res => {
        this.data$.next({ data: res });
        console.log(res);
      });
  }

  onSelect(data) {
    this.modalController.dismiss(data);
  }
  onCancel() {
    this.modalController.dismiss();
  }
}
