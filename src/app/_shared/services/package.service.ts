import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {CarwashService} from './carwash.service';
import {SERVICE_TYPE} from '../enums/SERVICE_TYPE';
import {Package} from '../models/package.model';
import {PackageItem} from '../models/package.item.model';
import {Carwash} from '../models/carwash.model';
import {Rating} from '../models/rating.model';
import {Promotion} from '../models/promotion.model';
import {Address} from '../models/address.model';
import {CarwashCoordinates} from '../models/carwash-coordinates.model';
import {Discount} from '../models/discount.model';
import {StoreHours} from '../../components/store-manager/shared/models/store-hours.model';
import {HoursException} from '../../components/store-manager/shared/models/hours-exception.model';
import {HoursOfOperation} from '../../components/store-manager/shared/models/hours-of-operation.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {pluck} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {VEHICLE_TYPE} from '../enums/VEHICLE_TYPE.model';


@Injectable({
    providedIn: 'root',
})
export class PackageService {
    private packageSubject = new BehaviorSubject<Package>(<Package>{});
    private packagesSubject = new BehaviorSubject<Package[]>(<Package[]>[]);
    private readonly allPackageItems: PackageItem[] = [];
    private readonly _package: Observable<Package> = this.packageSubject.asObservable();
    private readonly _packages: Observable<Package[]> = this.packagesSubject.asObservable();
    public creatingNewPackage = false;

    private currentPackageIndex: number;
    public serviceReady: boolean;

    constructor(private carwashService: CarwashService, private readonly fb: FormBuilder) {
        this.allPackageItems = carwashService.getAllPackageItems();
        this.loadPackages(SERVICE_TYPE.WASH);
        this.currentPackageIndex = 1;
    }

    public getForm(): FormGroup {
        return this.generatePackageForm(Package.EMPTY_MODEL);
    }

    // Initializes packages and package items
    public loadPackages(type: SERVICE_TYPE) {
        this.serviceReady = false;
        console.log('_LOADING PACKAGES_');
        this.carwashService.getAllPackages(type).subscribe(
            packages => {
                this.packagesSubject.next(packages);
                this.packageSubject.next(packages[this.currentPackageIndex]);
                console.log('_LOADING PACKAGES COMPLETE_');
                this.serviceReady = true;
                console.log('CURRENT PACKAGE: ', this._package);
            }
        );
    }

    get package(): Observable<Package> {
        if (!this._package) {
            console.log('Package is null');
            this.loadPackages(SERVICE_TYPE.WASH);
        }
        return this._package;
    }

    get packages(): Observable<Package[]> {
        return this._packages;
    }

    public setPackage(index: number) {
        if (index !== this.currentPackageIndex) {
            console.log('_SET PACKAGE_');
            this.currentPackageIndex = index;
            this.packageSubject.next(this.packagesSubject.getValue()[index]);
        } else {
            return;
        }
    }

    public setPackageArray(type: SERVICE_TYPE) {
        console.log('_SET PACKAGE ARRAY');
        this.loadPackages(type);
    }

    public getPackageItems(): Observable<PackageItem[]> {
        return this._package.pipe(
            pluck('packageItems')
        );
    }

    public isMonthly(): boolean {
        return false;
    }

    initNewPackage(): void {
        this.creatingNewPackage = true;
        this.packageSubject.next(Package.EMPTY_MODEL)
    }

    createPackage(packageForm: FormGroup): void {
        // Instantiate and initialize temp variables for One Time and Monthly price maps
        const oneTimePrices = new Map<VEHICLE_TYPE, number>();
        oneTimePrices.set(VEHICLE_TYPE.REGULAR, packageForm.get('pricingFormGroup.oneTimeRegularPrice').value);
        oneTimePrices.set(VEHICLE_TYPE.OVERSIZED, packageForm.get('pricingFormGroup.oneTimeOverSizedPrice').value);

        const monthlyPrices = new Map<VEHICLE_TYPE, number>();
        monthlyPrices.set(VEHICLE_TYPE.REGULAR, packageForm.get('pricingFormGroup.monthlyOverSizedPrice').value);
        monthlyPrices.set(VEHICLE_TYPE.OVERSIZED, packageForm.get('pricingFormGroup.monthlyOverSizedPrice').value);

        // Instantiate new Package
        const newPackage = new Package(
            packageForm.get('nameFormGroup.name').value,
            SERVICE_TYPE.WASH,
            oneTimePrices,
            packageForm.get('packageItemsFormGroup.packageItems').value,
            packageForm.get('durationFormGroup.duration').value,
            monthlyPrices,
        );

        console.log('Creating new package: ', newPackage);

        // Update packages array subject
        const currentValue = this.packagesSubject.value;
        const updatedValue = [...currentValue, newPackage];
        this.packagesSubject.next(updatedValue);
    }

/*    get displayPackages(): Map<PackageItem, boolean> {
        return this._displayPackages;
    }*/

/*    public resetDisplayPackages(): void {
        // Fill list of display packages
        for (const item of this.allPackageItems) {
            this.displayPackages.set(item, false);
        }
    }*/

/*    setDisplayPackage(packageItem: PackageItem, selected: boolean) {
        this._displayPackages.set(packageItem, selected);
    }*/

    // Static list of packages
    public getAllPackageItems(): PackageItem[] {
        return this.allPackageItems;
    }

    /* --------------------- UTIL METHODS (From Carwash Service) ------------------------- */

    private generatePackageForm(_package: Package): FormGroup {
        return this.fb.group({
            nameFormGroup: this.generateNameFormGroup(_package),
            pricingFormGroup: this.generatePricingFormGroup(_package),
            durationFormGroup: this.generateDurationFormGroup(_package),
            packageItemsFormGroup: this.generatePackageItemsFormGroup(_package)
        });
    }

    private generateNameFormGroup(_package: Package): FormGroup {
        return this.fb.group({
            name: [_package.name, Validators.required]
        });
    }

    private generatePricingFormGroup(_package: Package): FormGroup {
        return this.fb.group({
            oneTimeRegularPrice: [_package.oneTimePrices[VEHICLE_TYPE.REGULAR], Validators.required],
            oneTimeOverSizedPrice: [_package.oneTimePrices[VEHICLE_TYPE.OVERSIZED], Validators.required],
            monthlyRegularPrice: [_package.monthlyPrices[VEHICLE_TYPE.REGULAR], Validators.required],
            monthlyOverSizedPrice: [_package.monthlyPrices[VEHICLE_TYPE.OVERSIZED], Validators.required]
        });
    }

    private generateDurationFormGroup(_package: Package): FormGroup {
        return this.fb.group({
            duration: [_package.duration, Validators.required]
        });
    }

    private generatePackageItemsFormGroup(_package: Package): FormGroup {
        return this.fb.group({
            packageItems: [_package.packageItems, Validators.required]
        });
    }
}
