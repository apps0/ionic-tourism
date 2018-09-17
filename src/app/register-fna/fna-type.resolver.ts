import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable }             from 'rxjs';
import { FnaService } from '../shared/services/fna.service';
import { tap } from 'rxjs/operators';
  
@Injectable({
    providedIn:"root"
})
export class FnaTypeResolver implements Resolve<any> {
  constructor(private fnaService:FnaService, private router: Router) {}
 
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.fnaService.getType(route.paramMap.get('id'));
  }
}