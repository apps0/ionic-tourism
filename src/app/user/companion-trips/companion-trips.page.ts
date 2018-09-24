import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { TripService } from '../../shared/services/trip.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-companion-trips',
  templateUrl: './companion-trips.page.html',
  styleUrls: ['./companion-trips.page.scss'],
})
export class CompanionTripsPage implements OnInit {

  data$: BehaviorSubject<any> = new BehaviorSubject({ loading: true });

  constructor(
    private tripService: TripService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.currentUser$
      .pipe(
        switchMap(user => {
          // return this.tripService.getAllUserTrips("HqfugBhiIDFo0dHxi1g7");
          return this.tripService.getAllCompanionTrips(user.Id);
        })
      )
      .pipe(
        catchError(err => {
          this.data$.next({ error: true });
          return err;
        })
      )
      .subscribe(res => {
        console.log(res);
        if (res && res.length > 0) this.data$.next({ data: res });
        else this.data$.next({ empty: true });
      });
  }

}
