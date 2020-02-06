
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from './user.service';

@Injectable({
    providedIn: 'root',
})
export class RoleGuard implements CanActivate {

    constructor(private readonly userService: UserService, private readonly _router: Router) {
        console.log('Role Guard active');
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        const allowedRoles = next.data.allowedRoles;

        return this.userService.currentUser.map(user => {
            for (const role of allowedRoles) {
                console.log('Allowed roles: ', role);
                if (user.role === role) {
                    console.log(user.role + ' VALID');
                    return true;
                }
            }
            console.log(user.role + ' NOT VALID');
            this._router.navigate(['/404']); // TODO Change to 'Access Denied Page'
            return false;
        });
    }
}
