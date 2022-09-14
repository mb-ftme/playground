import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route, Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./AuthService";


@Injectable({
  providedIn: 'root'
})
export class GuardServiceGuard implements CanActivate {

  constructor(public authService:AuthService,public router:Router,) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot):
    Observable<boolean>| boolean {


     if (!this.authService.isLoggedIn()) {
       this.router.navigate(['/form']);
       return false;
     }

      // @ts-ignore
    return true;

  }


}
