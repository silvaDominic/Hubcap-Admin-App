import {Injectable} from '@angular/core';
import {Carwash} from '../models/carwash.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CARWASH_TYPE} from '../enums/CARWASH_TYPE.model';
import {Rating} from '../models/rating.model';
import {Address} from '../models/address.model';
import {CarwashCoordinates} from '../models/carwash-coordinates.model';
import {PackageItem} from '../models/package.item.model';
import {Package} from '../models/package.model';
import {Promotion} from '../models/promotion.model';
import {HoursOfOperation} from '../../components/store-manager/shared/models/hours-of-operation.model';
import {SERVICE_TYPE} from '../enums/SERVICE_TYPE';
import {ApiService} from '../../_core/services/api.service';
import {environment} from '../../../environments/environment';
import {pluck} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CarwashService {
    private static carwashPath = environment.package_manager_path;
    private static staticPackageItemsPath = environment.static_package_items_url;
    public static carwashObject: Observable<Carwash>;
    private static staticPackageItems: PackageItem[] = Array<PackageItem>();

    constructor(private http: HttpClient, private apiService: ApiService) {
    }

    // Register Carwash object
    public registerCarwash() {
        console.log('registerCarwash called');
        if (!CarwashService.carwashObject) {
            console.log('No carwash fetched.');
            console.log('FETCHING...');
            CarwashService.carwashObject = this.fetchCarwash();
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
        public getAllPackages(type: SERVICE_TYPE): Observable<Package[]> {
            switch (type) {
                case SERVICE_TYPE.WASH:
                    return CarwashService.carwashObject.pipe(
                        pluck('washPackages'));
                case SERVICE_TYPE.DETAIL:
                    return CarwashService.carwashObject.pipe(
                        pluck('detailPackages'));
                    break;
                default:
                    console.log('Invalid Package type');
                    console.log('Package type: ' + type + ' not found');
                    break;
            }
    }

    // Return static list of packageItems
    public getAllPackageItems(): PackageItem[] {
        return CarwashService.staticPackageItems;
    }

    public getName(): Observable<string> {
        return CarwashService.carwashObject.map(
            carwash => {return carwash.name});
    }

    public getType(): Observable<CARWASH_TYPE> {
        return CarwashService.carwashObject.map(
            carwash => {return carwash.type});
    }

    public getRatings(): Observable<Rating[]> {
        return CarwashService.carwashObject.map(
            carwash => {return carwash.ratings});
    }

    public getAddress(): Observable<Address> {
        return CarwashService.carwashObject.map(
            carwash => {return carwash.address});
    }

    public getCoordinates(): Observable<CarwashCoordinates> {
        return CarwashService.carwashObject.map(
            carwash => {return carwash.coordinates});
    }

    public getPromotions(): Observable<Promotion[]> {
        return CarwashService.carwashObject.map(
            carwash => {return carwash.promotions});
    }

    public getStoreHours(): Observable<HoursOfOperation> {
        return CarwashService.carwashObject.map(
            carwash => {return carwash.hoursOfOperation});
    }
}
