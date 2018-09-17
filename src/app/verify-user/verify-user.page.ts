import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../shared/services/user.service";
import { catchError } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-verify-user",
  templateUrl: "./verify-user.page.html",
  styleUrls: ["./verify-user.page.scss"]
})
export class VerifyUserPage implements OnInit {
  data$: BehaviorSubject<any> = new BehaviorSubject({ loading: true });
  role;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(param => {
      if (param.role) {
        this.role = +param.role;
        this.userService
          .getByRole(this.role)
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
    });
  }
}
