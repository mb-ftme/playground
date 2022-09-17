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

  isTokenExpired(token: string) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    console.log(JSON.parse(jsonPayload));
    const {exp} = JSON.parse(jsonPayload);
    console.log(exp)
    console.log(Date.now())
    const expired = Date.now() >= exp * 1000
    console.log("expired"+expired)
    return expired
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot):
    Observable<boolean> | boolean {

    let savedInToken = localStorage.getItem("id_token");
    let result = savedInToken !== `invalid`;
    // if (this.isTokenExpired(localStorage.getItem("id_token")!)) result =false;
    // this.isTokenExpired("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c")
    // this.isTokenExpired("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkiLCJleHAiOjE2NjM0MDc4NDV9.RP0ExwI3xZ5wT78k6C8SdyNj2q1wHCjDATukbck4g3E")
    result = ! this.isTokenExpired(savedInToken!);
    if (!result) this.router.navigate(['/login'])
    return result;

  }


}
