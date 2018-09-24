import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from "@angular/router";
import { map, take } from "rxjs/operators";
import { UserService } from "../shared/services/user.service";
import { PlaceService } from "../shared/services/place.service";
import { VehicleService } from "../shared/services/vehicle.service";
import { FnaService } from "../shared/services/fna.service";

@Injectable({
  providedIn: "root"
})
export class ReviewResolver implements Resolve<any> {
  constructor(
    private userService: UserService,
    private placeService: PlaceService,
    private vehicleService: VehicleService,
    private fnaService: FnaService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let id = route.paramMap.get("id");
    let reviewItem = route.paramMap.get("reviewItem");
    let service=null;
    if(reviewItem==="user") service=this.userService;
    else if(reviewItem==="vehicle") service=this.vehicleService;
    else if(reviewItem==="fna") service=this.fnaService;
    else if(reviewItem==="place") service=this.placeService;
    return service.getById(id).pipe(
      take(1),
      map(data => {
        if (data) {
          return data;
        } else {
          // id not found
          return null;
        } 
      })
    );
  }
}
