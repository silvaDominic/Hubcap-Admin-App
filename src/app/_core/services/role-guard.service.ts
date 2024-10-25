
import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route, CanLoad, UrlSegment} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from './user.service';
import {map, take} from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class RoleGuard implements CanActivate, CanLoad {

    constructor(private readonly userService: UserService, private readonly router: Router) {
        console.log('Role Guard active');
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        const allowedRoles = next.data.allowedRoles;

        return this.userService.currentUser.pipe(map(user => {
            for (const role of allowedRoles) {
                console.log('Allowed role: ', role);
                if (user.role === role) {
                    console.log(user.role + ' VALID');
                    return true;
                }
            }
            console.log(user.role + ' NOT VALID');
            this.router.navigate(['/404']); // TODO Change to 'Access Denied Page'
            return false;
        }));
    }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return this.userService.isAuthenticated.pipe(take(1), map(auth => {
            if (auth == true) {
                return true;
            }
            console.warn('User not authenticated. ACCESS DENIED.');
            // navigate to login page
            this.router.navigate([route.path + '/login']);
            // you can save redirect url so after authing we can move them back to the page they requested
            return false;
        }));
    }
}
