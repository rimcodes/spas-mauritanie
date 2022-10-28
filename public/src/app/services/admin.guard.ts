import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private router: Router,
    private localStorageService: LocalstorageService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.localStorageService.getToken();

    if (token) {
        const tokenDecode = JSON.parse(atob(token.split('.')[1]));
        if (tokenDecode.isAdmin && !this._tokenExpired(tokenDecode.exp))
            return true;
    }
    this.router.navigate(['/rc-admin/login']);
    return false;

    return true;
  }

  private _tokenExpired(expiration: number): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
}

}
