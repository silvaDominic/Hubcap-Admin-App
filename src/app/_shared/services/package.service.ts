import {Injectable} from '@angular/core';
import {CarwashService} from './carwash.service';
import {SERVICE_TYPE} from '../enums/SERVICE_TYPE';
import {Package} from '../models/package.model';
import {DisplayPackageItem} from '../models/display-package-item.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {VEHICLE_TYPE} from '../enums/VEHICLE_TYPE.model';
import {PackageItem} from '../models/package-item.model';
import {CONSTANTS} from '../constants';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Price} from '../models/price.model';
import {map} from 'rxjs/operators';
import {ALL_PACKAGES} from '../enums/ALL_PACKAGES.model';

@Injectable({
    providedIn: 'root',
})
export class PackageService {
    static packagesKeys = Object.keys(ALL_PACKAGES);

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

    constructor(private readonly carwashService: CarwashService,
                private readonly packageService: PackageService,
                private readonly fb: FormBuilder,
                private readonly snackBar: MatSnackBar) {
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
        return this.packageArraySubject.pipe(map(
            packageArray => packageArray.filter(_package => _package.id === id)[0]
        ));
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
            console.log('_SET PACKAGE_', this.packageArraySubject.getValue()[index]);
            console.log('@ Index: ', index);
            this._currentPackageIndex = index;
            this.packageSubject.next(this.packageArraySubject.getValue()[index]);
        } else {
            console.log('Same index, package not set');
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

    public getPackageIndexById(id: string): number {
        return this.packageArraySubject.getValue().findIndex(_package => _package.id === id);
    }

    // Check whether monthly prices has any values
    public hasMonthly(): boolean {
        console.log('Has monthly? ', this.packageSubject.getValue().monthlyPrices.REGULAR);
        return !!(this.packageSubject.getValue().monthlyPrices.REGULAR !== null || 0);
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
                this.selectedPackageItems,
                Package.EMPTY_MODEL.duration,
                Package.EMPTY_MODEL.monthlyPrices
            )
        );
        // Current index null until package created or existing package selected
        this._currentPackageIndex = null;
    }



    cancelNewPackage(): void {
        this.creatingNewPackage = false;
        if (this.packageArraySubject.getValue().length > 0 && this.packageArraySubject.getValue() != null) {
            this.setPackage(0);
            this.refreshDisplayPackageOptions();
        } else {
            console.log('No package to default to. Current index set to null');
            this.currentPackageIndex = null;
        }
    }

    // Post and Cache new package
    createPackage(packageForm: FormGroup): Promise<boolean> {
        // Instantiate and initialize temp variables for One Time and Monthly price maps
        const oneTimePrices = new Price(packageForm.get('pricingFormGroup.oneTimeRegularPrice').value, packageForm.get('pricingFormGroup.oneTimeOverSizedPrice').value);
        console.log('OTP: ', oneTimePrices);

        const monthlyPrices = new Price(packageForm.get('pricingFormGroup.monthlyRegularPrice').value, packageForm.get('pricingFormGroup.monthlyOverSizedPrice').value);
        console.log('MP: ', monthlyPrices);

        const packageItems = new Array<PackageItem>();
        console.log('Package Items from form: ', packageForm.get('packageItemsFormGroup').value);

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

            // Set id if new package
            newPackage.id = res.id;

            this.packageSubject.next(newPackage);

            // Update package array
            const currentPackagesArrayValue = this.packageArraySubject.getValue();
            this.packageArraySubject.next([...currentPackagesArrayValue, newPackage]);

            // Update carwash object
            this.carwashService.cachePackages([...currentPackagesArrayValue, newPackage], newPackage.type);

            return true;
        }).catch((res) => {
            console.warn('Error CREATING package: ' + newPackage.name);
            console.warn(res);

            return false;
        });
    }

    // Post and Cache new package
    // WARNING - DUPLICATE CODE WITH 'savePackage()'
    updatePackage(packageForm: FormGroup): Promise<boolean> {

        // Instantiate and initialize temp variables for One Time and Monthly price maps
        const oneTimePrices = new Price(packageForm.get('pricingFormGroup.oneTimeRegularPrice').value, packageForm.get('pricingFormGroup.oneTimeOverSizedPrice').value);
        console.log('OTP: ', oneTimePrices);

        const monthlyPrices = new Price(packageForm.get('pricingFormGroup.monthlyRegularPrice').value, packageForm.get('pricingFormGroup.monthlyOverSizedPrice').value);
        console.log('MP: ', monthlyPrices);

        // Instantiate new Package
        const updatedPackage = new Package(
            this.packageSubject.getValue().id,
            packageForm.get('nameFormGroup.name').value,
            packageForm.get('serviceTypeFormGroup.serviceType').value,
            oneTimePrices,
            this.selectedPackageItems,
            packageForm.get('durationFormGroup.duration').value,
            monthlyPrices,
        );

        console.log('Creating new package: ', updatedPackage);

        return this.carwashService.updatePackage(updatedPackage).then((res: Package) => {
            console.log('Package Post SUCCESS', res);

            // Update behavior subject
            this.packageSubject.next(updatedPackage);

            const currentPackagesArrayValue = this.packageArraySubject.getValue();

            // Update package array with newly updated package
            currentPackagesArrayValue[this.currentPackageIndex] = updatedPackage;

            // Update behavior subject with latest package array value
            this.packageArraySubject.next(currentPackagesArrayValue);

            // Update carwash object
            this.carwashService.cachePackages(currentPackagesArrayValue, updatedPackage.type);

            return true;

        }).catch((reason) => {
            console.warn('Error CREATING package: ' + updatedPackage.name);
            console.warn(reason);
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
            for (const item of res) {
                updatedDisplayPackageItems.set(item, false);
            }
            this.displayPackageItemsSubject.next(updatedDisplayPackageItems);
        });
        console.log('PS -- Init Display Items -- EXIT');
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
            item.selectedSubOption = null;
            updatedPackageItems.set(item, false);
        }
        // Update behavior subject
        this.displayPackageItemsSubject.next(updatedPackageItems);
        console.log('DPI Subject: ', this.displayPackageItemsSubject.value);
        console.log('PS -- Reset Display Package Items -- EXIT');
    }

    // Handles resetting display packages and then updating them
    // NOTE: This method is called on initialization and every time a package selection change is made.
    public refreshDisplayPackageOptions(resetOnly: boolean = false) {
        console.log('PS -- Refresh Package Options -- ENTER');
        // Update local variable when packages change
        this.selectedPackageItems = this.packageSubject.value.packageItems;
        console.log('Current selected package items: ', this.selectedPackageItems);
        this.resetDisplayPackageItems();
        if (!resetOnly) {
            this.updateDisplayPackageItems();
        }
        console.log('PS -- Refresh Package Options -- EXIT');
    }

    // Handles changing between Wash and Detail packages
    public changeServiceType(packageType: string, clearDPIs: boolean = false) {
        console.log('Changing service type to: ', packageType);
        this.selectedServiceType = SERVICE_TYPE[packageType];
        this.setPackageArray(this.selectedServiceType);
        this.refreshDisplayPackageOptions(clearDPIs);
    }

    // Updates display package items according to the current selected package
    private updateDisplayPackageItems() {
        console.log('PS -- Update Display Items -- ENTER');
        // Temp variable used for updating behavior subject
        const updatedDisplayPackageItems: Map<DisplayPackageItem, boolean> = new Map<DisplayPackageItem, boolean>();

        if (this.selectedPackageItems.length <= 0) {
            console.log('No selected packages found. Resetting all to false...');
            this.resetDisplayPackageItems();
            return;
        }

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
        console.log('Updated DPIs: ', updatedDisplayPackageItems);
        console.log('Updated Selected Packages: ', this.selectedPackageItems);
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
        if (this.packageSubject == null) {
            return this.generatePackageForm(Package.EMPTY_MODEL);
        } else {
            return this.generatePackageForm(this.packageSubject.getValue());
        }
    }

    private generatePackageForm(_package: Package): FormGroup {
        return this.fb.group({
            serviceTypeFormGroup: this.generateServiceTypeFormGroup(_package),
            nameFormGroup: this.generateNameFormGroup(_package),
            pricingFormGroup: this.generatePricingFormGroup(_package),
            durationFormGroup: this.generateDurationFormGroup(_package),
            packageItemsFormGroup: this.fb.array(Array.from(this.displayPackageItemsSubject.getValue().keys())
                .map(item => this.generatePackageItemsFormGroup(item)))
        });
    }

    private generateServiceTypeFormGroup(_package: Package): FormGroup {
        return this.fb.group({
            serviceType: [_package.type, Validators.required]
        })
    }

    private generateNameFormGroup(_package: Package): FormGroup {
        return this.fb.group({
            name: [_package.name,
                [
                    Validators.required,
                    Validators.pattern(CONSTANTS.ALPHABET_NUM_EXT_VALIDATOR),
                    Validators.maxLength(CONSTANTS.PACKAGE_NAME_MAX_LENGTH_VALIDATOR)
                ]
            ]
        });
    }

    private generatePricingFormGroup(_package: Package): FormGroup {
        return this.fb.group({
            oneTimeRegularPrice: [_package.oneTimePrices[VEHICLE_TYPE.REGULAR],
                [
                    Validators.required,
                    Validators.maxLength(CONSTANTS.PACKAGE_PRICE_MAX_LENGTH_VALIDATOR),
                    Validators.pattern(CONSTANTS.NUM_ONLY_NON_ZERO)
                ]
            ],
            oneTimeOverSizedPrice: [_package.oneTimePrices[VEHICLE_TYPE.OVERSIZED],
                [
                    Validators.required,
                    Validators.maxLength(CONSTANTS.PACKAGE_PRICE_MAX_LENGTH_VALIDATOR),
                    Validators.pattern(CONSTANTS.NUM_ONLY_NON_ZERO)
                ]
            ],
            monthlyRegularPrice: [_package.monthlyPrices[VEHICLE_TYPE.REGULAR],
                [
                    Validators.maxLength(CONSTANTS.PACKAGE_PRICE_MAX_LENGTH_VALIDATOR),
                    Validators.pattern(CONSTANTS.NUM_ONLY_NON_ZERO)
                ]
            ],
            monthlyOverSizedPrice: [_package.monthlyPrices[VEHICLE_TYPE.OVERSIZED],
                [
                    Validators.maxLength(CONSTANTS.PACKAGE_PRICE_MAX_LENGTH_VALIDATOR),
                    Validators.pattern(CONSTANTS.NUM_ONLY_NON_ZERO)
                ]
            ],
        });
    }

    private generateDurationFormGroup(_package: Package): FormGroup {
        return this.fb.group({
            duration: [_package.duration,
                [
                    Validators.required,
                    Validators.pattern(CONSTANTS.NUM_ONLY_NON_ZERO),
                    Validators.maxLength(CONSTANTS.PACKAGE_DURATION_MAX_LENGTH_VALIDATOR)
                ]
            ]
        });
    }

    private generatePackageItemsFormGroup(packageItem: DisplayPackageItem | PackageItem): FormGroup {
        return this.fb.group({
            name: [packageItem.name],
            selectedSubOption: [packageItem.selectedSubOption]
        });
    }

    /* --------------------- UTIL METHODS ------------------------- */

    public openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 4000,
        });
    }
}
