import {Injectable} from '@angular/core';
import {Carwash} from '../models/carwash.model';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {DisplayPackageItem} from '../models/display-package-item.model';
import {Package} from '../models/package.model';
import {Promotion} from '../models/promotion.model';
import {SERVICE_TYPE} from '../enums/SERVICE_TYPE';
import {ApiService} from '../../_core/services/api.service';
import {environment} from '../../../environments/environment';
import {pluck, take} from 'rxjs/operators';
import {Store} from '../models/store.model';
import {CONSTANTS} from '../CONSTANTS';
import {UserService} from '../../_core/services/user.service';
import {Utilities} from '../utilities';
import {CARWASH_COMPONENT} from '../enums/CARWASH_COMPONENT.model';

@Injectable({
    providedIn: 'root'
})
export class CarwashService {
    private static carwashPath = environment.package_manager_path;
    private static staticPackageItemsPath = environment.static_package_items_url;
    private static carwashSubject = new BehaviorSubject(<Carwash>{});
    public static carwash: Observable<Carwash>;
    private static displayPackageItems = of(new Array<DisplayPackageItem>());

    constructor(
        private readonly http: HttpClient,
        private readonly apiService: ApiService,
        private readonly userService: UserService
    ) {
    }

    // Register Carwash object
    public registerCarwash(): void {
        if (!CarwashService.carwash) {
            CarwashService.carwash = CarwashService.carwashSubject.asObservable();
            console.log('No carwash fetched.');
            console.log('FETCHING...');
            this.fetchCarwash().subscribe(
                carwash => {
                    CarwashService.carwashSubject.next(Utilities.convertToCarwashObject(carwash));
                    console.log('_LOADING CARWASH COMPLETE_');
                    console.log('CURRENT CARWASH: ', CarwashService.carwashSubject.getValue());
                }
            );
        } else {
            console.log('Carwash already fetched.');
        }
    }

    // Register all package items
    public registerAllPackageItems(): void {
        CarwashService.displayPackageItems = this.fetchStaticPackageItems();
    }

    // Retrieve JSON from backend
    private fetchCarwash(): Observable<Carwash> {
        return this.apiService.get<Carwash>(CarwashService.carwashPath);
    }

    // Retrieve all package items from assets
    private fetchStaticPackageItems(): Observable<DisplayPackageItem[]> {
        return this.apiService.get<DisplayPackageItem[]>(CarwashService.staticPackageItemsPath);
    }

    /* ---------------- MAIN GET METHODS -----------------*/

    /* PACKAGES */
    public getAllPackages(type: SERVICE_TYPE): Observable<Package[]> {
        switch (type) {
            case SERVICE_TYPE.WASH:
                return CarwashService.carwash.pipe(
                    pluck('washPackages'));
                break;
            case SERVICE_TYPE.DETAIL:
                return CarwashService.carwash.pipe(
                    pluck('detailPackages'));
                break;

            // TODO Find out why merge is not working
            /*            case SERVICE_TYPE.WASH_AND_DETAIL:
                            const washPackages = CarwashService.carwash.pipe(
                                pluck('washPackages'));
                            const detailPackages = CarwashService.carwash.pipe(
                                pluck('detailPackages'));

                            return Observable.merge(washPackages, detailPackages);
                            break;*/
            default:
                console.log('Invalid Package type');
                console.log('Package type: ' + type + ' not found');
                break;
        }
    }

    // Return static list of packageItems
    public getDisplayPackageItems(): Observable<DisplayPackageItem[]> {
        return CarwashService.displayPackageItems;
    }

    /* STORE */
    public getCarwashMetaData(): Observable<Store> {
        return CarwashService.carwash.pipe(pluck('metaData'));
    }

    /* PROMOTIONS */
    public getPromotionsArray(): Observable<Promotion[]> {
        return CarwashService.carwash.pipe(pluck('promotions'));
    }


    /* ---------------- API CALLS -----------------*/

    /* STORE */
    public postNewStore(newStore: Store): Promise<boolean> {
        // Set HttpHeaders
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', CONSTANTS.DEFAULT_CONTENT_TYPE);
        // httpHeaders.set('Bearer Token', this.userService.getToken());

        // Make post and save new object on success
        return this.apiService.post('/stores', new HttpParams(), httpHeaders, newStore).pipe(take(1)).toPromise();
    }

    public updateStore(updatedStore: Store): void {
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

    private cacheStore(storeToCache: Store): void {
        // Create new carwash object with updated metadata info
        const carwashToUpdate = CarwashService.carwashSubject.getValue();
        carwashToUpdate.metaData = storeToCache;
        // Push to carwash cached object
        CarwashService.carwashSubject.next(carwashToUpdate);
    }

    /* PACKAGE */
    public postNewPackage(newPackage: Package) {
        // Set HttpHeaders
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', CONSTANTS.DEFAULT_CONTENT_TYPE);
        // httpHeaders.set('Bearer Token', this.userService.getToken());

        console.log('Package to Post: ', newPackage);

        // Make post and return promise for subservice to resolve
        return this.apiService.post('/packages', new HttpParams(), httpHeaders, newPackage).pipe(take(1)).toPromise();
    }

    public postNewPackageArray(newPackageArray: Package[]): Promise<any> {
        // Set HttpHeaders
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', CONSTANTS.DEFAULT_CONTENT_TYPE);
        // httpHeaders.set('Bearer Token', this.userService.getToken());

        // Make post and return promise for subservice to resolve
        return this.apiService.post('/packages', new HttpParams(), httpHeaders, newPackageArray).pipe(take(1)).toPromise();
    }

    public deletePackage(id: string) {
        // Set HttpHeaders
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', CONSTANTS.DEFAULT_CONTENT_TYPE);
        // httpHeaders.set('Bearer Token', this.userService.getToken());

        const httpParams = new HttpParams();
        httpParams.set('type', CARWASH_COMPONENT.PACKAGE);
        httpParams.set('id', id);

        // Make post and return promise for subservice to resolve
        return this.apiService.post('/packages', httpParams, httpHeaders).pipe(take(1)).toPromise();
    }

    public cachePackages(packageArrayToCache: Package[], type: SERVICE_TYPE) {
        // Create new carwash object with updated package array info
        const carwashToUpdate = CarwashService.carwashSubject.getValue();

        // Check type to ensure it's saved to correct array
        if (type === SERVICE_TYPE.WASH) {
            carwashToUpdate.washPackages = packageArrayToCache;
        } else if (type === SERVICE_TYPE.DETAIL) {
            carwashToUpdate.detailPackages = packageArrayToCache;
        }
        // Update carwash object
        CarwashService.carwashSubject.next(carwashToUpdate);
    }

    /* PROMOTION */
    public postNewPromotion(newPromotion: Promotion): Promise<any> {
        // Set HttpHeaders
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', CONSTANTS.DEFAULT_CONTENT_TYPE);
        // httpHeaders.set('Bearer Token', this.userService.getToken());

        console.log('Promotion to Post: ', newPromotion);

        // Make post and return promise for subservice to resolve
        return this.apiService.post('/promotions', new HttpParams(), httpHeaders, newPromotion).pipe(take(1)).toPromise();
    }

    public deletePromotion(id: string): Promise<any> {
        // Set HttpHeaders
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', CONSTANTS.DEFAULT_CONTENT_TYPE);
        // httpHeaders.set('Bearer Token', this.userService.getToken());

        const httpParams = new HttpParams();
        httpParams.set('type', CARWASH_COMPONENT.PROMOTION);
        httpParams.set('id', id);

        // Make post and return promise for subservice to resolve

        return this.apiService.post('/promotions', httpParams, httpHeaders).pipe(take(1)).toPromise();
    }

    public cachePromotions(promotionArrayToCache: Promotion[]) {
        // Create new carwash object with updated promo array info
        const carwashToUpdate = CarwashService.carwashSubject.getValue();
        carwashToUpdate.promotions = promotionArrayToCache;
        // Push to carwash cached object
        CarwashService.carwashSubject.next(carwashToUpdate);
    }
}
