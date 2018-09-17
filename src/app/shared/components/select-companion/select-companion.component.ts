import { Component, OnInit, Output } from '@angular/core';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-select-companion',
  templateUrl: './select-companion.component.html',
  styleUrls: ['./select-companion.component.scss']
})
export class SelectCompanionComponent implements OnInit {

  data$: BehaviorSubject<any> = new BehaviorSubject({ loading: true });
  
  constructor(
    public modalController: ModalController,
    private userService: UserService,
    public loadingController: LoadingController,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.userService
      .getCompanions()
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

  onSelect(data) {
    this.modalController.dismiss(data);
  }
  onCancel() {
    this.modalController.dismiss();
  }
}
