import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { TripService } from "../shared/services/trip.service";
import { take, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class TripResolver implements Resolve<any> {
  constructor(private tripService: TripService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.tripService.get(route.paramMap.get("id")).pipe(
      tap(x => {
        if (!x) this.router.navigate(["/login"]);
      }),
      take(1)
    );
  }
}
