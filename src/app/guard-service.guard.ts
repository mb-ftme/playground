import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
   Router,
  RouterStateSnapshot

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

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean> | boolean {

      console.log("the gourd is called")
      let savedInToken = localStorage.getItem("id_token");
      let tokenIsNotInvalid = (savedInToken !== "invalid");
      console.log("tokenIsNotInvalid" + tokenIsNotInvalid)
      let tokenIsNotExpired = !this.isTokenExpired(savedInToken!);
      console.log("tokenIsNotExpired" + tokenIsNotExpired)
      if (!tokenIsNotExpired || !tokenIsNotInvalid) this.router.navigate(['/login'])
      return (tokenIsNotExpired && tokenIsNotInvalid);

  }


}
