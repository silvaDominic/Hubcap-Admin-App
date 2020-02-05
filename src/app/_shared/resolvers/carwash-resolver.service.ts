import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from '../../_core/services/user.service';
import {Observable} from 'rxjs';
import {CarwashService} from '../services/carwash.service';
import {Utilities} from '../utilities';
import {Carwash} from '../models/carwash.model';

export class CarwashResolverService implements Resolve<boolean> {

    constructor(
        private router: Router,
        private userService: UserService,
        private carwashService: CarwashService
    ) {
    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        return this.carwashService.registerCarwash().toPromise().then(carwash => {
            if (carwash == null) {
                console.log('No carwash found');
                console.log('Creating empty Carwash...');
                CarwashService.carwashSubject.next(Utilities.convertToCarwashObject(Carwash.EMPTY_MODEL));
                this.serviceReady = true;
                console.log('CURRENT CARWASH: ', CarwashService.carwashSubject.getValue());
                return true;
                ;
                // Set carwash if one already exists
            } else if (carwash != null || carwash != undefined) {
                console.log('Carwash VALID');
                CarwashService.carwashSubject.next(Utilities.convertToCarwashObject(carwash));
                this.serviceReady = true;
                console.log('_LOADING CARWASH COMPLETE_');
                console.log('CURRENT CARWASH: ', CarwashService.carwashSubject.getValue());
                return true;
            }
        })
    }
}
