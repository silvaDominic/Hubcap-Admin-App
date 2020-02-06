import {Injectable} from '@angular/core';
import {CarwashService} from './carwash.service';
import {SERVICE_TYPE} from '../enums/SERVICE_TYPE';
import {Package} from '../models/package.model';
import {DisplayPackageItem} from '../models/display-package-item.model';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {VEHICLE_TYPE} from '../enums/VEHICLE_TYPE.model';
import {PackageItem} from '../models/package-item.model';
import 'rxjs/operators/map';

@Injectable({
    providedIn: 'root',
})
export class PackageService {
    private readonly packageSubject = new BehaviorSubject<Package>(<Package>{});
    private readonly packageArraySubject = new BehaviorSubject<Package[]>(<Package[]>[]);
    private readonly displayPackageItemsSubject = new BehaviorSubject<Map<DisplayPackageItem, boolean>>(new Map<DisplayPackageItem, boolean>());
    private _package: Observable<Package> = this.packageSubject.asObservable();
    private _packageArray: Observable<Package[]> = this.packageArraySubject.asObservable();
    private _displayPackageItems: Observable<Map<DisplayPackageItem, boolean>> = this.displayPackageItemsSubject.asObservable();
    public selectedPackageItems: PackageItem[] = new Array<PackageItem>();

    public selectedServiceType: SERVICE_TYPE;
    public creatingNewPackage = false;
    private _isMonthly = false;

    private _currentPackageIndex: number;
    public serviceReady: boolean;

    constructor(private readonly carwashService: CarwashService, private readonly packageService: PackageService, private readonly fb: FormBuilder) {
        this.currentPackageIndex = 0;
        this.selectedServiceType = SERVICE_TYPE.WASH;
        this.loadPackageArray(SERVICE_TYPE.WASH);
    }

    // Initializes packages and package items
    public loadPackageArray(type: SERVICE_TYPE): void {
        console.log('_LOADING PACKAGES_');
        // this.mainSubscription = this.carwashService.getAllPackages(type).subscribe(
        this.carwashService.getAllPackages(type).subscribe(
            packageArray => {
                // Check if package array is valid
                if (packageArray != null && !(packageArray.length <= 0)) {
                    console.log('Package Array VALID', packageArray);
                    this.packageArraySubject.next(packageArray);
                    console.log('CURRENT PACKAGE ARRAY: ', this.packageArraySubject.getValue());
                    // If valid check if the first in the array is valid
                    if (packageArray[this._currentPackageIndex] != null || packageArray[this._currentPackageIndex] != undefined) {
                        console.log('_LOADING PACKAGES COMPLETE_');
                        this.packageSubject.next(packageArray[this._currentPackageIndex]);
                        console.log('CURRENT PACKAGE: ', this.packageSubject.getValue());
                        this.serviceReady = true;
                    } else {
                        // If first package of array is invalid, warn browser and create empty one for use in form
                        console.log('Package INVALID', packageArray[this._currentPackageIndex]);
                        console.log('@ Index: ', this._currentPackageIndex);
                        console.log('Creating empty package...');
                        this.serviceReady = true;
                        this.initNewPackage();
                    }

                } else {
                    // If no packages are found, create empty one for use in form
                    console.log('_NO PACKAGES FOUND_');
                    console.log('Package Creation Required');
                    this.serviceReady = true;
                    this.initNewPackage();
                }
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

    get displayPackageItems(): Observable<Map<DisplayPackageItem, boolean>> {
        return this._displayPackageItems;
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

    // Handles changing between Wash and Detail packages
    public changeServiceType(packageType: string, clearDPIs: boolean = false) {
        console.log('Changing service type to: ', packageType);
        this.selectedServiceType = SERVICE_TYPE[packageType];
        this.setPackageArray(this.selectedServiceType);
        this.refreshDisplayPackageOptions(clearDPIs);
    }

    // Initialize a new package by wiping global variables and creating new empty package object
    initNewPackage(): void {
        this.creatingNewPackage = true;
        this.resetDisplayPackageItems();
        this.selectedPackageItems = new Array<PackageItem>();
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
        console.log('Package Form: ', packageForm.value);
        // Instantiate and initialize temp variables for One Time and Monthly price maps
        const oneTimePrices = new Map<VEHICLE_TYPE, number>();
        oneTimePrices.set(VEHICLE_TYPE.REGULAR, packageForm.get('pricingFormGroup.oneTimeRegularPrice').value);
        oneTimePrices.set(VEHICLE_TYPE.OVERSIZED, packageForm.get('pricingFormGroup.oneTimeOverSizedPrice').value);

        const monthlyPrices = new Map<VEHICLE_TYPE, number>();
        monthlyPrices.set(VEHICLE_TYPE.REGULAR, packageForm.get('pricingFormGroup.monthlyRegularPrice').value);
        monthlyPrices.set(VEHICLE_TYPE.OVERSIZED, packageForm.get('pricingFormGroup.monthlyOverSizedPrice').value);

        // Instantiate new Package
        const newPackage = new Package(
            null,
            packageForm.get('nameFormGroup.name').value,
            packageForm.get('serviceTypeFormGroup.serviceType').value,
            oneTimePrices,
            this.selectedPackageItems,
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
            console.warn('Error CREATING package: ' + newPackage.name);
            console.warn(reason);
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
    public getDisplayPackageItems(): Observable<Map<DisplayPackageItem, boolean>> {
        return this.displayPackageItems;
    }

    // Initializes the DISPLAYPackageItemSubject by subscribing to observable and setting initial value
    public initDisplayPackageItems(): void {
        console.log('PS -- Init Display Items -- ENTER');
        // Temp variable used to update behavior subject
        const updatedDisplayPackageItems: Map<DisplayPackageItem, boolean> = new Map<DisplayPackageItem, boolean>();
        // Subscribe and update object
        // Update behavior subject when finished
        this.carwashService.getDisplayPackageItems().subscribe(res => {
            console.log('Did DPI register yet?', res);
            for (const item of res) {
                updatedDisplayPackageItems.set(item, false);
            }
            this.displayPackageItemsSubject.next(updatedDisplayPackageItems);
            console.log('DPI Subject: ', this.displayPackageItemsSubject.value);
        }, error => console.log('DPI ERROR: ', error));
        console.log('PS -- Init Display Items -- EXIT');
    }

    // Resets the display items (sets them all to false)
    public resetDisplayPackageItems(): void {
        console.log('PS -- Reset Display Package Items -- ENTER');
        // Make sure the behavior subject isn't null
        if (this.displayPackageItemsSubject.value == null) {
            console.log('Display packages null. Attempting to reinitialize');
            this.initDisplayPackageItems();
        }
        // Temp variable used to update behavior subject
        const updatedPackageItems: Map<DisplayPackageItem, boolean> = new Map<DisplayPackageItem, boolean>();
        for (const item of this.displayPackageItemsSubject.value.keys()) {
            updatedPackageItems.set(item, false);
        }
        // Update behavior subject
        this.displayPackageItemsSubject.next(updatedPackageItems);
        console.log('DPI Subject: ', this.displayPackageItemsSubject.value);
        console.log('PS -- Reset Display Package Items -- EXIT');
    }

    public togglePIButton(event: any, index: number, item: any) {
        event.target.classList.toggle('selected');
        // If selected, deselect and remove from selectedPackageItems array
        if (item.value == true) {
            item.value = false;
            this.selectedPackageItems.filter((packageItem, i) => {
                if (item.key.name === packageItem.name) {
                    console.log(item.key.name + ' converted to false ' + packageItem.name);
                    this.selectedPackageItems.splice(i, 1);
                }
            });
            // If NOT selected, select and add to selectedPackageItems array
        } else if (item.value == false) {
            item.value = true;
            console.log(item.key.name + ' converted to ' + item.value);
            console.log(item);
            this.selectedPackageItems.push(new PackageItem(item.key.name, item.key.selectedSubOption));
        }
    }

    // Handles resetting display packages and then updating them
    // NOTE: This method is called on initialization and every time a package selection change is made.
    public refreshDisplayPackageOptions(resetOnly: boolean = false) {
        console.log('PS -- Refresh Package Options -- ENTER');
        // Update local variable when packages change
        this.selectedPackageItems = this.packageSubject.value.packageItems;
        this.resetDisplayPackageItems();
        if (!resetOnly) {
            this.updateDisplayPackageItems();
        }
        console.log('PS -- Refresh Package Options -- EXIT');
    }

    // Updates display package items according to the current selected package
    private updateDisplayPackageItems() {
        console.log('PS -- Update Display Items -- ENTER');
        // Temp variable used for updating behavior subject
        const updatedDisplayPackageItems: Map<DisplayPackageItem, boolean> = new Map<DisplayPackageItem, boolean>();

        // NOTE: This feels like an ugly solution
        // Loop through known STATIC package items that correspond to current package
        for (const staticItem of this.displayPackageItemsSubject.value.keys()) {
            // Check against SELECTED list of all package items used for display
            // NOTE: index is used to also keep track of end of array
            for (const [i, selectedItem] of this.selectedPackageItems.entries()) {
                // If the names of both SELECTED and STATIC match
                // update any suboptions and set temp variable to true
                if (selectedItem.name === staticItem.name) {
                    staticItem.selectedSubOption = selectedItem.selectedSubOption;
                    updatedDisplayPackageItems.set(staticItem, true);
                    break;
                } else if (i === this.selectedPackageItems.length - 1) {
                    updatedDisplayPackageItems.set(staticItem, false);
                }
            }
        }
        // Update behavior subject after update
        this.displayPackageItemsSubject.next(updatedDisplayPackageItems);
        console.log('PS -- Update Display Items -- EXIT');
    };

    public selectInputChange(event, index, item): void {
        // If selected, deselect and remove from selectedPackageItems array
        this.selectedPackageItems.filter((packageItem, i) => {
            if (item.key.name === packageItem.name) {
                this.selectedPackageItems[i].selectedSubOption = item.key.selectedSubOption
            }
        });
    }

    /* --------------------- FORM METHODS ------------------------- */

    public getForm(): FormGroup {
        return this.generatePackageForm(Package.EMPTY_MODEL);
    }

    private generatePackageForm(_package: Package): FormGroup {
        return this.fb.group({
            serviceTypeFormGroup: this.generateServiceTypeFormGroup(_package),
            nameFormGroup: this.generateNameFormGroup(_package),
            pricingFormGroup: this.generatePricingFormGroup(_package),
            durationFormGroup: this.generateDurationFormGroup(_package),
            packageItemsFormGroup: this.generatePackageItemsFormGroup(_package)
        });
    }

    private generateServiceTypeFormGroup(_package: Package): FormGroup {
        return this.fb.group({
            serviceType: [_package.type, Validators.required]
        })
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
