import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {CarwashService} from './carwash.service';
import {SERVICE_TYPE} from '../enums/SERVICE_TYPE';
import {Package} from '../models/package.model';
import {DisplayPackageItem} from '../models/display-package-item.model';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {VEHICLE_TYPE} from '../enums/VEHICLE_TYPE.model';

@Injectable({
    providedIn: 'root',
})
export class PackageService {
    private readonly packageSubject = new BehaviorSubject<Package>(<Package>{});
    private readonly packageArraySubject = new BehaviorSubject<Package[]>(<Package[]>[]);
    private _package: Observable<Package> = this.packageSubject.asObservable();
    private _packageArray: Observable<Package[]> = this.packageArraySubject.asObservable();
    private _DisplayPackageItems = of(new Array<DisplayPackageItem>());
    public creatingNewPackage = false;
    private _isMonthly = false;

    private _currentPackageIndex: number;
    public serviceReady: boolean;

    constructor(private readonly carwashService: CarwashService, private readonly fb: FormBuilder) {
        this.currentPackageIndex = 0;
        this.loadPackageArray(SERVICE_TYPE.WASH);
    }

    // Initializes packages and package items
    public loadPackageArray(type: SERVICE_TYPE): void {
        this.serviceReady = false;

        console.log('_LOADING PACKAGES_');
        // this.mainSubscription = this.carwashService.getAllPackages(type).subscribe(
        const temp = this.carwashService.getAllPackages(type);
        temp.subscribe(
            packageArray => {
                // Check if package array is valid
                if (packageArray != null && !(packageArray.length <= 0)) {
                    console.log('Package Array VALID', packageArray);
                    console.log('CURRENT PACKAGE ARRAY: ', this.packageArraySubject.getValue());
                    this.packageArraySubject.next(packageArray);
                    // If valid check if the first in the array is valid
                    if (packageArray[this._currentPackageIndex] != null || packageArray[this._currentPackageIndex] != undefined) {
                        console.log('_LOADING PACKAGES COMPLETE_');
                        console.log('CURRENT PACKAGE: ', this.packageSubject.getValue());
                        this.packageSubject.next(packageArray[this._currentPackageIndex]);
                        this.serviceReady = true;
                    } else {
                        // If first package of array is invalid, warn browser and create empty one for use in form
                        console.log('Package INVALID', packageArray[this._currentPackageIndex]);
                        console.log('@ Index: ', this._currentPackageIndex);
                        console.log('Creating empty package...');
                        this.packageSubject.next(Package.EMPTY_MODEL);
                        this.serviceReady = true;
                        this.creatingNewPackage = true;
                    }

                } else {
                    // If no packages are found, create empty one for use in form
                    console.log('_NO PACKAGES FOUND_');
                    console.log('Package Creation Required');
                    this.packageSubject.next(Package.EMPTY_MODEL);
                    this.creatingNewPackage = true;
                }
                this._DisplayPackageItems = this.carwashService.getDisplayPackageItems();
            }
        );
    }

    get package(): Observable<Package> {
        if (!this._package) {
            console.log('Package is null or undefined');
            this.loadPackageArray(SERVICE_TYPE.WASH);
        }
        return this._package;
    }

    getPackageById(id: string) {
        return this.packageArraySubject.map(
            packageArray => packageArray.filter(_package => _package.id === id)[0]
        );
    }

    get packageArray(): Observable<Package[]> {
        if (!this._packageArray) {
            console.log('Package Array is null or undefined');
            this.loadPackageArray(SERVICE_TYPE.WASH);
        }
        return this._packageArray;
    }

    get DisplayPackageItems(): Observable<DisplayPackageItem[]> {
        return this._DisplayPackageItems;
    }

    public setPackage(index: number): void {
        if (index !== this._currentPackageIndex) {
            console.log('_SET PACKAGE_');
            console.log('@ Index: ', index);
            this._currentPackageIndex = index;
            this.packageSubject.next(this.packageArraySubject.getValue()[index]);
        }
    }

    get currentPackageIndex() {
        return this._currentPackageIndex;
    }

    set currentPackageIndex(newIndex: number) {
        this._currentPackageIndex = newIndex;
    }

    public setPackageArray(type: SERVICE_TYPE) {
        console.log('_SET PACKAGE ARRAY');
        this.loadPackageArray(type);
    }

    public getPackageArrayLength(): number {
        return this.packageArraySubject.getValue().length;
    }

    public getCurrentPackageType(): SERVICE_TYPE {
        return this.packageSubject.getValue().type;
    }

    // Check whether monthly prices has any values
    public hasMonthly(): boolean {
        console.log('Has monthly? ', this.packageSubject.getValue().monthlyPrices.get(VEHICLE_TYPE.REGULAR));
        return !!(this.packageSubject.getValue().monthlyPrices.get(VEHICLE_TYPE.REGULAR) !== null || 0);
    }

    switchToMonthly() {
        this._isMonthly = true;
    }

    switchToOneTime() {
        this._isMonthly = false;
    }

    get isMonthly() {
        return this._isMonthly;
    }

    set isMonthly(state: boolean) {
        this._isMonthly = state;
    }

    initNewPackage(): void {
        this.creatingNewPackage = true;
        this.packageSubject.next(
            new Package(
                Package.EMPTY_MODEL.id,
                Package.EMPTY_MODEL.name,
                Package.EMPTY_MODEL.type,
                Package.EMPTY_MODEL.oneTimePrices,
                Package.EMPTY_MODEL.packageItems,
                Package.EMPTY_MODEL.duration,
                Package.EMPTY_MODEL.monthlyPrices
            )
        );
        // Current index null until package created or existing package selected
        this._currentPackageIndex = null;
        console.log('Initialized Package: ', this.packageSubject.getValue());
    }

    cancelNewPackage(): void {
        this.creatingNewPackage = false;
        if (this.packageArraySubject.getValue().length > 0 && this.packageArraySubject.getValue() != null) {
            this.setPackage(0);
        } else {
            console.log('No package to default to. Current index set to null');
            this.currentPackageIndex = null;
        }
    }

    // Post and Cache new package
    // WARNING - DUPLICATE CODE WITH 'savePackage()'
    createPackage(packageForm: FormGroup): Promise<boolean> {
        // Instantiate and initialize temp variables for One Time and Monthly price maps
        const oneTimePrices = new Map<VEHICLE_TYPE, number>();
        oneTimePrices.set(VEHICLE_TYPE.REGULAR, packageForm.get('pricingFormGroup.oneTimeRegularPrice').value);
        oneTimePrices.set(VEHICLE_TYPE.OVERSIZED, packageForm.get('pricingFormGroup.oneTimeOverSizedPrice').value);

        const monthlyPrices = new Map<VEHICLE_TYPE, number>();
        monthlyPrices.set(VEHICLE_TYPE.REGULAR, packageForm.get('pricingFormGroup.monthlyRegularPrice').value);
        monthlyPrices.set(VEHICLE_TYPE.OVERSIZED, packageForm.get('pricingFormGroup.monthlyOverSizedPrice').value);

        console.log('Package Items from Form: ', packageForm.get('packageItemsFormGroup.packageItems').value);

        // Instantiate new Package
        const newPackage = new Package(
            null,
            packageForm.get('nameFormGroup.name').value,
            SERVICE_TYPE.WASH,
            oneTimePrices,
            packageForm.get('packageItemsFormGroup.packageItems').value, // Not typing properly
            packageForm.get('durationFormGroup.duration').value,
            monthlyPrices,
        );

        console.log('Creating new package: ', newPackage);

        return this.carwashService.postNewPackage(newPackage).then((res) => {
            console.log('Package Post SUCCESS', res);

            // Update package
            this.packageSubject.next(newPackage);

            // Update package array
            const currentPackagesArrayValue = this.packageArraySubject.getValue();
            this.packageArraySubject.next([...currentPackagesArrayValue, newPackage]);

            // Update carwash object
            this.carwashService.cachePackages([...currentPackagesArrayValue, newPackage], newPackage.type);

            return true;
        }).catch((reason) => {
            console.warn('Error SAVING package: ' + newPackage.name);
            return false;
        });
    }

    // Update and save updated package
    // WARNING - DUPLICATE CODE WITH 'createNewPackage()'
    savePackage(updatedPackage: Package): Promise<boolean> {
        return this.carwashService.updatePackage(updatedPackage).then((res) => {
            console.log('Package Post SUCCESS', res);

            // Update package
            this.packageSubject.next(updatedPackage);

            // Update package array
            const currentPackagesArrayValue = this.packageArraySubject.getValue();
            this.packageArraySubject.next([...currentPackagesArrayValue, updatedPackage]);

            // Update carwash object
            this.carwashService.cachePackages([...currentPackagesArrayValue, updatedPackage], updatedPackage.type);

            return true;
        }).catch((reason) => {
            console.warn('Error SAVING package: ' + updatedPackage.name);
            return false;
        });
    }

    // Update and cache entire package array
    savePackageArray(updatedPackageArray: Package[], serviceType: SERVICE_TYPE): Promise<boolean> {
        return this.carwashService.updatePackageArray(updatedPackageArray).then((res) => {
            console.log('Package Post SUCCESS', res);

            // Update packages
            this.packageArraySubject.next(updatedPackageArray);

            // Update carwash object
            this.carwashService.cachePackages(updatedPackageArray, serviceType);

            return true;
        }).catch((reason) => {
            console.warn('Error SAVING all packages of type: ' + serviceType);
            return false;
        });
    }

    // Delete package from database and remove locally
    deletePackage(id: string, serviceType: SERVICE_TYPE): Promise<boolean> {
        const updatedPackageArray = this.packageArraySubject.getValue();

        return new Promise<boolean>(((resolve, reject) => {
            updatedPackageArray.some(
                (_package, i) => {
                    if (_package.id === id) {
                        return this.carwashService.deletePackage(id).then((result) => {
                                console.log('Package deletion SUCCESS: ', result);
                                updatedPackageArray.splice(i, 1);

                                this.packageArraySubject.next(updatedPackageArray);
                                this.carwashService.cachePackages(updatedPackageArray, serviceType);
                                resolve(true);
                            }
                        ).catch(reason => {
                            reject('Error DELETING package: ' + _package.id);
                        });
                    } else if (i == updatedPackageArray.length - 1) {
                        reject('Package with ID: ' + id + ' does not exist. Try again or contact your Admin for help');
                    }
                }
            );
        }));
    }

    // Static list of packages
    public getDisplayPackageItems(): Observable<DisplayPackageItem[]> {
        return this.DisplayPackageItems;
    }

    /* --------------------- FORM METHODS ------------------------- */

    public getForm(): FormGroup {
        return this.generatePackageForm(Package.EMPTY_MODEL);
    }

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
