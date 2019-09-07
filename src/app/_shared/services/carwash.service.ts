import {Injectable} from '@angular/core';
import {Carwash} from '../models/carwash.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {WASH_PACKAGE} from '../enums/WASH_PACKAGE.model';
import {CARWASH_TYPE} from '../enums/CARWASH_TYPE.model';
import {Rating} from '../models/rating.model';
import {Address} from '../models/address.model';
import {CarwashCoordinates} from '../models/carwash-coordinates.model';
import {map} from 'rxjs/operators';
import {DETAIL_PACKAGE} from '../enums/DETAIL_PACKAGE.model';
import {StoreHours} from '../../components/store-manager/shared/models/store-hours.model';
import {Discount} from '../models/discount.model';
import {HoursException} from '../../components/store-manager/shared/models/hours-exception.model';
import {PackageItem} from '../models/package.item.model';
import {Package} from '../models/package.model';
import {Promotion} from '../models/promotion.model';
import {HoursOfOperation} from '../../components/store-manager/shared/models/hours-of-operation.model';
import {CONSTANTS} from '../CONSTANTS';
import {SERVICE_TYPE} from '../enums/SERVICE_TYPE';

@Injectable({
    providedIn: 'root'
})
export class CarwashService {
    public static carwashUrl = 'http://localhost:4200/assets/data/carwash.json';
    private static carwashObject: Carwash;
    private static allPackageItems: PackageItem[];

    constructor(private http: HttpClient) {
        CarwashService.allPackageItems = [];
    }

    fetchStores() {}

    // Register Carwash object
    public registerCarwash() {
        console.log('registerCarwash called');
        if (!CarwashService.carwashObject) {
            console.log('No carwash fetched.');
            console.log('FETCHING...');
            this.fetchCarwash().subscribe(
                (carwash => CarwashService.carwashObject = carwash)
            );
            this.registerAllPackageItems()
        } else {
            console.log('Carwash already fetched.');
        }
    }

    // Register all package items
    private registerAllPackageItems() {
        this.fetchAllPackageItems().subscribe(
            (allPackageItems => CarwashService.allPackageItems = allPackageItems)
        );
    }

    // Retrieve JSON from backend
    private fetchCarwash(): Observable<Carwash> {
        return this.http.get<any>(CarwashService.carwashUrl).pipe(
            map(carwashData => {
                return this.convertToCarwashObject(carwashData);
            }));
    }

    // Retrieve all package items from assets
    private fetchAllPackageItems(): Observable<PackageItem[]> {
        return <Observable<PackageItem[]>>(this.http.get<PackageItem[]>(CONSTANTS.PACKAGE_ITEMS_URL));
    }

    /* ---------------- MAIN GET METHODS -----------------*/

    // Return the specified package from the Carwash Object
    public getPackage(index: number, type: SERVICE_TYPE): Package {
        switch (type) {
            case SERVICE_TYPE.WASH:
                return CarwashService.carwashObject.washPackages[index];
            case SERVICE_TYPE.DETAIL:
                return CarwashService.carwashObject.detailPackages[index];
            default:
                console.log('Invalid Package type or index or both');
                console.log('Package index: ' + index);
                console.log('Package type: ' + type);
                break;
        }
    }

    public getAllPackages(type: SERVICE_TYPE): Package[] {
        switch (type) {
            case SERVICE_TYPE.WASH:
                return CarwashService.carwashObject.washPackages;
            case SERVICE_TYPE.DETAIL:
                return CarwashService.carwashObject.detailPackages;
            default:
                console.log('Invalid Package type');
                console.log('Package type: ' + type + ' not found');
                break;
        }
    }

    public getPromotion(id: string): Promotion {
        for (let i = 0; i < CarwashService.carwashObject.promotions.length; i++) {
            if (CarwashService.carwashObject.promotions[i].id === id) {
                return CarwashService.carwashObject.promotions[i];
            } else {
                console.log('Invalid Promotion ID');
                console.log('Promotion ID: ' + id + ' not found.');
            }
        }
    }

    // Return static list of packageItems
    public getAllPackageItems(): PackageItem[] {
        return CarwashService.allPackageItems;
    }

    public getName(): string {
        return CarwashService.carwashObject.name;
    }

    public getType(): CARWASH_TYPE {
        return CarwashService.carwashObject.type;
    }

    public getRatings(): Rating[] {
        return CarwashService.carwashObject.ratings;
    }

    public getAddress(): Address {
        return CarwashService.carwashObject.address;
    }

    public getCoordinates(): CarwashCoordinates {
        return CarwashService.carwashObject.coordinates;
    }

    public getPromotions(): Promotion[] {
        return CarwashService.carwashObject.promotions;
    }

    public getStoreHours(): HoursOfOperation {
        return CarwashService.carwashObject.hoursOfOperation;
    }

    /* --------------------- UTIL METHODS ------------------------- */


    // Main util method for converting json data to instance objects
    private convertToCarwashObject(data: any): Carwash {
        const ratings = Array<Rating>();
        data.ratings.map(rating => ratings.push(this.generateRating(rating)));

        const promotions = Array<Promotion>();
        data.promotions.map(promotion => promotions.push(this.generatePromotion(promotion)));

        const washPackages = Array<Package>();
        data.washPackages.map(washPackage => washPackages.push(this.generatePackage(washPackage)));

        const detailPackages = Array<Package>();
        data.detailPackages.map(detailPackage => detailPackages.push(this.generatePackage(detailPackage)));

        return new Carwash(
            data.id,
            data.name,
            data.type,
            ratings,
            this.generateAddress(data.address),
            this.generateCoordinates(data.coordinates),
            promotions,
            washPackages,
            detailPackages,
            this.generateHoursOfOperation(data.hoursOfOperation)
        );
    }

    private generateAddress(data: any): Address {
        return new Address(
            data.city,
            data.state,
            data.street,
            data.zipcode
        );
    }

    private generateCoordinates(data: any): CarwashCoordinates {
        return new CarwashCoordinates(
            data.latitude,
            data.longitude
        );
    }

    private generateRating(data: any): Rating {
        return new Rating(
            data.customerName,
            data.score,
            data.review,
            data.date
        );
    }

    private generatePromotion(data: any): Promotion {
        return new Promotion(
            data.id,
            data.name,
            data.description,
            data.serviceType,
            data.frequencyType,
            data.frequency,
            data.startDate,
            data.endDate,
            data.discountPackages,
            this.generateDiscount(data.discount),
            data.startTime,
            data.endTime
        );
    }

    private generateDiscount(data: any): Discount {
        return new Discount(
            data.E_DISCOUNT_TYPE,
            data.discountAmount,
            data.discountFeatures
        );
    }

    private generatePackage(data: any): Package {
        return new Package(
            data.name,
            data.type,
            data.onetimePrices,
            data.packageItems.map(packageItem => this.generatePackageItem(packageItem)),
            data.duration,
            data.monthlyPrices,
            data.isUnlimitedMonthly,
            data.monthlyUses
        );
    }

    private generatePackageItem(data: any): PackageItem {
        return new PackageItem(
            data.name,
            data.isRequired,
            data.itemType,
            data.selectedSubOptions,
            data.subOptions
        );
    }

    private generateHoursOfOperation(data: any) {
        const storeHours = Array<StoreHours>();
        data.storeHours.map(storeHour => storeHours.push(this.generateStoreHours(storeHour)));

        const hoursExceptions = Array<HoursException>();
        data.storeHours.map(exception => hoursExceptions.push(this.generateHoursExceptions(exception)))

        return new HoursOfOperation(
            storeHours,
            hoursExceptions
        );
    }

    private generateHoursExceptions(data: any): HoursException {
        return new HoursException(
            data.name,
            data.date,
            data.exceptionType,
            data.openTime,
            data.closeTime);
    }

    private generateStoreHours(data: any): StoreHours {
        return new StoreHours(
            data.day,
            data.openTime,
            data.closeTime
        );
    }
}
