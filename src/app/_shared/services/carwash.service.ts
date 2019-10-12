import {Injectable} from '@angular/core';
import {Carwash} from '../models/carwash.model';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {CARWASH_TYPE} from '../enums/CARWASH_TYPE.model';
import {Rating} from '../models/rating.model';
import {Address} from '../models/address.model';
import {CarwashCoordinates} from '../models/carwash-coordinates.model';
import {PackageItem} from '../models/package.item.model';
import {Package} from '../models/package.model';
import {Promotion} from '../models/promotion.model';
import {HoursOfOperation} from '../models/hours-of-operation.model';
import {SERVICE_TYPE} from '../enums/SERVICE_TYPE';
import {ApiService} from '../../_core/services/api.service';
import {environment} from '../../../environments/environment';
import {map, pluck, tap} from 'rxjs/operators';
import {Store} from '../models/store.model';
import {CONSTANTS} from '../CONSTANTS';
import {UserService} from '../../_core/services/user.service';

@Injectable({
    providedIn: 'root'
})
export class CarwashService {
    private static carwashPath = environment.package_manager_path;
    private static staticPackageItemsPath = environment.static_package_items_url;
    private static carwashSubject = new BehaviorSubject(<Carwash>{});
    public static carwash: Observable<Carwash>;
    private static staticPackageItems: PackageItem[] = Array<PackageItem>();

    constructor(
        private readonly http: HttpClient,
        private readonly apiService: ApiService,
        private readonly userService: UserService
    ) {}

    // Register Carwash object
    public registerCarwash() {
        console.log('registerCarwash called');
        if (!CarwashService.carwash) {
            CarwashService.carwash = CarwashService.carwashSubject.asObservable();
            console.log('No carwash fetched.');
            console.log('FETCHING...');
            this.fetchCarwash().subscribe(
                carwash => {
                    CarwashService.carwashSubject.next(carwash);
                    console.log('_LOADING CARWASH COMPLETE_');
                    console.log('CURRENT CARWASH: ', CarwashService.carwashSubject.getValue());
                }
            );
            this.registerAllPackageItems();
        } else {
            console.log('Carwash already fetched.');
        }
    }

    // Register all package items
    public registerAllPackageItems() {
       this.fetchStaticPackageItems().subscribe(
           allPackageItems =>  CarwashService.staticPackageItems = allPackageItems
       );
    }

    // Retrieve JSON from backend
    private fetchCarwash(): Observable<Carwash> {
        return this.apiService.get<Carwash>(CarwashService.carwashPath);
    }

    // Retrieve all package items from assets
    private fetchStaticPackageItems(): Observable<PackageItem[]> {
        return this.apiService.get<PackageItem[]>(CarwashService.staticPackageItemsPath);
    }

    /* ---------------- MAIN GET METHODS -----------------*/

    /* PACKAGES */
    public getAllPackages(type: SERVICE_TYPE): Observable<Package[]> {
        switch (type) {
            case SERVICE_TYPE.WASH:
                return CarwashService.carwash.pipe(
                    pluck('washPackages'));
            case SERVICE_TYPE.DETAIL:
                return CarwashService.carwash.pipe(
                    pluck('detailPackages'));
                break;
            default:
                console.log('Invalid Package type');
                console.log('Package type: ' + type + ' not found');
                break;
        }
    }

    public getCarwashMetaData(): Observable<Store> {
        let store = Store.EMPTY_MODEL;

        CarwashService.carwash.subscribe(carwash => {
            store = carwash.metaData;

/*                store.id = carwash.metaData.id;
                store.name = carwash.metaData.name;
                store.type = carwash.metaData.type;
                store.ratings = carwash.metaData.ratings;
                store.address = carwash.metaData.address;
                store.phoneNumber = carwash.metaData.phoneNumber;
                store.coordinates = carwash.metaData.coordinates;
                store.hoursOfOperation = carwash.metaData.hoursOfOperation;
                store.email = carwash.metaData.email;
                store.website = carwash.metaData.website*/
            }
        );
        return of(store);
    }

    // Return static list of packageItems
    public getAllPackageItems(): PackageItem[] {
        return CarwashService.staticPackageItems;
    }

    /* ---------------- API CALLS -----------------*/

    /* STORE */
    public createNewStore(newStore: Store)  {
        // Set HttpHeaders
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', CONSTANTS.DEFAULT_CONTENT_TYPE);
        // httpHeaders.set('Bearer Token', this.userService.getToken());

        // Make post and save new object on success
        this.apiService.post('/stores', new HttpParams(), httpHeaders).subscribe(
            response => {
                // Set new ID generated from backend and cache new store
                newStore.id = response.id;
                this.cacheStore(newStore);
            },
            error => console.log('Error CREATING store: ', error)
        );
    }

    updateStore(updatedStore: Store) {
        // Set HttpHeaders
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', CONSTANTS.DEFAULT_CONTENT_TYPE);

        // Temporary
        this.cacheStore(updatedStore);


/*        this.apiService.post('stores', new HttpParams(), httpHeaders).subscribe(
            response => {
                this.cacheStore(updatedStore);
            },
            error => console.log('Error UPDATING store: ', error)
        )*/
    }

    private cacheStore(storeToUpdate: Store) {
        // Create new carwash object with updated metadata info
        const updatedCarwash = CarwashService.carwashSubject.getValue();
        updatedCarwash.metaData = storeToUpdate;
        // Push to carwash cached object
        CarwashService.carwashSubject.next(updatedCarwash);
    }
}
