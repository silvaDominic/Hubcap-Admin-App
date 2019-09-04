
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from './user.service';

@Injectable()
export class RoleGuard implements CanActivate {


    constructor(private userService: UserService, private _router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const user = {};

/*        if (user.Role === next.data.role) {
            return true;
        }*/

        // navigate to not found page
        this._router.navigate(['/404']);
        return false;
    }
}
