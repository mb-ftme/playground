import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route, Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "./AuthService";


@Injectable({
  providedIn: 'root'
})
export class GuardServiceGuard implements CanActivate {

  constructor(public authService: AuthService, public router: Router,) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot):
    Observable<boolean> | boolean {

    let result = localStorage.getItem("id_token") !== `invalid`;
    if (!result) this.router.navigate(['/login'])
    return result;

  }


}
