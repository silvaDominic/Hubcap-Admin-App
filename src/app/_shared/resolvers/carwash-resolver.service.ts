import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from '../../_core/services/user.service';
import {Observable, of} from 'rxjs';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/merge';
import {CarwashService} from '../services/carwash.service';
import {Utilities} from '../utilities';
import {Carwash} from '../models/carwash.model';
import {Injectable} from '@angular/core';
import {DisplayPackageItem} from '../models/display-package-item.model';
import {ApiService} from '../../_core/services/api.service';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CarwashResolverService implements Resolve<boolean> {

    private static carwashPath = environment.carwash_url;
    private static displayPackageItems = environment.display_package_items_url;

    constructor(
        private router: Router,
        private userService: UserService,
        private carwashService: CarwashService,
        private apiService: ApiService
    ) {
    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        return Observable.forkJoin(
            this.fetchDisplayPackageItems(), // data[0]
            this.fetchCarwash() // data[1]
        ).map(data => {
            CarwashService.displayPackageItems = of(data[0]);
            if (data[1] == null) {
                console.log('No carwash found');
                console.log('Creating empty Carwash...');
                CarwashService.carwashSubject.next(Utilities.convertToCarwashObject(Carwash.EMPTY_MODEL));
                this.carwashService.serviceReady = true;
                console.log('CURRENT CARWASH: ', CarwashService.carwashSubject.getValue());
                return true;
                // Set carwash if one already exists
            } else if (data[1] != null || data[1] != undefined) {
                console.log('Carwash VALID');
                CarwashService.carwashSubject.next(Utilities.convertToCarwashObject(data[1]));
                this.carwashService.serviceReady = true;
                console.log('_LOADING CARWASH COMPLETE_');
                console.log('CURRENT CARWASH: ', CarwashService.carwashSubject.getValue());
                return true;
            }
        });
    }

    // Retrieve Carwash object from backend
    private fetchCarwash(): Observable<Carwash> {
        return this.apiService.get<Carwash>(CarwashResolverService.carwashPath);
        return of(null);
    }

    // Retrieve all package items from assets
    private fetchDisplayPackageItems(): Observable<DisplayPackageItem[]> {
        return this.apiService.get<DisplayPackageItem[]>(CarwashResolverService.displayPackageItems);
    }
}
