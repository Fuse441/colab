import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { localStorageKey } from '@shared/config/localStorageKey';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem(localStorageKey.token) ?? '';
    if (token) {
      return true;
    } else {

      this.router.navigate(['/login']);
      return false;
    }
  }

}
