import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment} from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from './user.service';
import { take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
    constructor(private router: Router, private userService: UserService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.userService.isAuthenticated.pipe(take(1)).map(auth => {
            if (auth == true) {
                return true;
            }
            console.warn('User not authenticated. ACCESS DENIED.');
            // navigate to login page
            this.router.navigate(['/login']);
            // you can save redirect url so after authing we can move them back to the page they requested
            return false;
        });
    }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return this.userService.isAuthenticated.pipe(take(1)).map(auth => {
            if (auth == true) {
                return true;
            }
            console.warn('User not authenticated. ACCESS DENIED.');
            // navigate to login page
            this.router.navigate([route.path + '/login']);
            // you can save redirect url so after authing we can move them back to the page they requested
            return false;
        });
    }
}
