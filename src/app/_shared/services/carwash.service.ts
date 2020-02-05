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
import {JwtService} from '../../_core/services/jwt.service';

@Injectable({
    providedIn: 'root'
})
export class CarwashService {
    private static carwashPath = environment.carwash_url;
    private static staticPackageItemsPath = environment.display_package_items_url;
    private static carwashSubject = new BehaviorSubject(<Carwash>{});
    private static displayPackageItems = of(new Array<DisplayPackageItem>());
    public static carwash: Observable<Carwash> = CarwashService.carwashSubject.asObservable();
    private serviceReady: boolean = false;

    constructor(
        private readonly http: HttpClient,
        private readonly apiService: ApiService,
    ) {
    }

    // Register Carwash object
    public registerCarwash(): Observable<Carwash> {
        return this.fetchCarwash().map(
            carwash => {
                // Create an empty Carwash object if null
                if (carwash == null) {
                    console.log('No carwash found');
                    console.log('Creating empty Carwash...');
                    CarwashService.carwashSubject.next(Utilities.convertToCarwashObject(Carwash.EMPTY_MODEL));
                    this.serviceReady = true;
                    console.log('CURRENT CARWASH: ', CarwashService.carwashSubject.getValue());
                    return CarwashService.carwashSubject.getValue();
                    // Set carwash if one already exists
                } else if (carwash != null || carwash != undefined) {
                    console.log('Carwash VALID');
                    CarwashService.carwashSubject.next(Utilities.convertToCarwashObject(carwash));
                    this.serviceReady = true;
                    console.log('_LOADING CARWASH COMPLETE_');
                    console.log('CURRENT CARWASH: ', CarwashService.carwashSubject.getValue());
                    return CarwashService.carwashSubject.getValue();
                }
            }
        );
    }

    // Register all package items to static variable
    public registerDisplayPackageItems(): void {
        console.log('Fetching DPIs');
        CarwashService.displayPackageItems = this.fetchDisplayPackageItems();
    }

    // Retrieve Carwash object from backend
    private fetchCarwash(): Observable<Carwash> {
        return this.apiService.get<Carwash>(CarwashService.carwashPath);
        // return of(null);
    }

    // Retrieve all package items from assets
    private fetchDisplayPackageItems(): Observable<DisplayPackageItem[]> {
        return this.apiService.get<DisplayPackageItem[]>(CarwashService.staticPackageItemsPath);
    }

    /* ---------------- MAIN GET METHODS -----------------*/

    /* PACKAGES */
    public getAllPackages(type: SERVICE_TYPE): Promise<Package[]> {
            return new Promise<Package[]>((resolve, reject) => {
                if (!this.serviceReady) {
                    this.registerCarwash().toPromise().then(carwash => {
                        switch (type) {
                            case SERVICE_TYPE.WASH:
                                resolve(carwash.washPackages);
                                break;
                            case SERVICE_TYPE.DETAIL:
                                resolve(carwash.detailPackages);
                                break;

                            // TODO Find out why merge is not working
                            case SERVICE_TYPE.WASH_AND_DETAIL:
                                // Merge Wash and Detail arrays
                                resolve([...carwash.washPackages, ...carwash.detailPackages]);
                                break;
                            default:
                                console.log('Invalid Package type');
                                console.log('Package type: ' + type + ' not found');
                                break;
                        }
                    }).catch(reason => {
                        reject(reason);
                    });
                } else {
                    switch (type) {
                        case SERVICE_TYPE.WASH:
                            resolve(CarwashService.carwashSubject.getValue().washPackages);
                            break;
                        case SERVICE_TYPE.DETAIL:
                            resolve(CarwashService.carwashSubject.getValue().detailPackages);
                            break;

                        // TODO Find out why merge is not working
                        case SERVICE_TYPE.WASH_AND_DETAIL:
                            // Merge Wash and Detail arrays
                            resolve([...CarwashService.carwashSubject.getValue().washPackages, ...CarwashService.carwashSubject.getValue().detailPackages]);
                            break;
                        default:
                            console.log('Invalid Package type');
                            console.log('Package type: ' + type + ' not found');
                            break;
                    }
                }
            })
    }

    // Return static list of packageItems
    public getDisplayPackageItems() {
        return CarwashService.displayPackageItems;
    }

    /* STORE */
    public getCarwashMetaData(): Promise<Store> {
        return new Promise<Store>((resolve, reject) => {
            this.registerCarwash().toPromise().then(carwash => {
                resolve(carwash.metaData);
            }).catch(reason => {
                reject(reason);
            })
        });
    }

    /* PROMOTIONS */
    public getPromotionsArray(): Promise<Promotion[]> {
        return new Promise<Promotion[]>((resolve, reject) => {
            this.registerCarwash().toPromise().then(carwash => {
                resolve(carwash.promotions);
            }).catch(reason => {
                reject(reason);
            })
        });
    }


    /* ---------------- API CALLS -----------------*/

    /* STORE */
    public postNewStore(newStore: Store): Promise<any> {
        // Set HttpHeaders
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', CONSTANTS.DEFAULT_CONTENT_TYPE);
        // httpHeaders.set('Bearer Token', this.userService.getToken());

        // Make post and save new object on success
        return this.apiService.post(environment.new_store_url, new HttpParams(), httpHeaders, newStore).pipe(take(1)).toPromise();
    }

    public updateStore(updatedStore: Store): Promise<any> {
        // Set HttpHeaders
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', CONSTANTS.DEFAULT_CONTENT_TYPE);
        // httpHeaders.set('Bearer Token', this.jwtService.getToken());

        return this.apiService.post(environment.update_store_url, new HttpParams(), httpHeaders, updatedStore).pipe(take(1)).toPromise();
    }

    public cacheStore(storeToCache: Store): void {
        // Create new carwash object with updated metadata info
        const carwashToUpdate = CarwashService.carwashSubject.getValue();
        carwashToUpdate.metaData = storeToCache;
        // Push to carwash cached object
        CarwashService.carwashSubject.next(carwashToUpdate);
    }

    /* PACKAGE */
    public postNewPackage(newPackage: Package): Promise<any> {
        // Set HttpHeaders
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', CONSTANTS.DEFAULT_CONTENT_TYPE);
        // httpHeaders.set('Bearer Token', this.userService.getToken());

        console.log('Package to Post: ', newPackage);

        // Make post and return promise for subservice to resolve
        return this.apiService.post(environment.new_package_url, new HttpParams(), httpHeaders, newPackage).pipe(take(1)).toPromise();
    }

    public updatePackage(newPackage: Package): Promise<any> {
        // Set HttpHeaders
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', CONSTANTS.DEFAULT_CONTENT_TYPE);
        // httpHeaders.set('Bearer Token', this.userService.getToken());

        console.log('Package to Post: ', newPackage);

        // Make post and return promise for subservice to resolve
        return this.apiService.post(environment.update_package_url, new HttpParams(), httpHeaders, newPackage).pipe(take(1)).toPromise();
    }

    public updatePackageArray(newPackageArray: Package[]): Promise<any> {
        // Set HttpHeaders
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', CONSTANTS.DEFAULT_CONTENT_TYPE);
        // httpHeaders.set('Bearer Token', this.userService.getToken());

        // Make post and return promise for subservice to resolve
        return this.apiService.post(environment.update_package_array_url, new HttpParams(), httpHeaders, newPackageArray).pipe(take(1)).toPromise();
    }

    public deletePackage(id: string): Promise<any> {
        // Set HttpHeaders
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', CONSTANTS.DEFAULT_CONTENT_TYPE);
        // httpHeaders.set('Bearer Token', this.userService.getToken());

        const httpParams = new HttpParams();
        httpParams.set('type', CARWASH_COMPONENT.PACKAGE);
        httpParams.set('id', id);

        // Make post and return promise for subservice to resolve
        return this.apiService.post(environment.delete_package_url, httpParams, httpHeaders).pipe(take(1)).toPromise();
    }

    public cachePackages(packageArrayToCache: Package[], type: SERVICE_TYPE): void {
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
        return this.apiService.post(environment.new_promotion_url, new HttpParams(), httpHeaders, newPromotion).pipe(take(1)).toPromise();
    }

    public updatePromotion(newPromotion: Promotion): Promise<any> {
        // Set HttpHeaders
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', CONSTANTS.DEFAULT_CONTENT_TYPE);
        // httpHeaders.set('Bearer Token', this.userService.getToken());

        console.log('Promotion to Post: ', newPromotion);

        // Make post and return promise for subservice to resolve
        return this.apiService.post(environment.update_promotion_url, new HttpParams(), httpHeaders, newPromotion).pipe(take(1)).toPromise();
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
        return this.apiService.post(environment.delete_promotion_url, httpParams, httpHeaders).pipe(take(1)).toPromise();
    }

    public cachePromotions(promotionArrayToCache: Promotion[]): void {
        // Create new carwash object with updated promo array info
        const carwashToUpdate = CarwashService.carwashSubject.getValue();
        carwashToUpdate.promotions = promotionArrayToCache;
        // Push to carwash cached object
        CarwashService.carwashSubject.next(carwashToUpdate);
    }
}
