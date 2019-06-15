import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AmazingTimePickerService} from 'amazing-time-picker';
import {PackageService} from '../../../shared/services/package.service';
import {Promotion} from '../../shared/models/promotion.model';
import {DISCOUNT_TYPE} from '../../../shared/models/DISCOUNT_TYPE.model';
import {PackageItem} from '../../../package-manager/shared/package.item.model';
import {PromotionService} from '../../../shared/services/promotion.service';
import {FREQUENCY_TYPE} from '../../../shared/models/FREQUENCY_TYPE.model';
import {MatSnackBar} from '@angular/material';
import {WASH_PACKAGE} from '../../../shared/models/WASH_PACKAGE.model';
import {PACKAGE_TYPE} from '../../../shared/models/PACKAGE_TYPE.model';
import {ALL_PACKAGES} from '../../../shared/models/ALL_PACKAGES.model';
import {Discount} from '../../shared/models/discount.model';

@Component({
  selector: 'app-promo-form',
  templateUrl: './promo-form.component.html',
  styleUrls: ['./promo-form.component.scss']
})
export class PromoFormComponent implements OnInit {
    // Dynamic promotion
    @Input() focusPromotion: Promotion;
    @Input() promotions: Promotion[];
    // Package list for "Free Feature" input
    @Input() packageItems: PackageItem[];

    // Form Builder Groups
    packageTypeFormGroup: FormGroup;
    nameFormGroup: FormGroup;
    descriptionFormGroup: FormGroup;
    frequencyFormGroup: FormGroup;
    discountFormGroup: FormGroup;
    packageFormGroup: FormGroup;
    activeTimeFormGroup: FormGroup;

    // Enums
    discountType = DISCOUNT_TYPE;
    frequencyType = FREQUENCY_TYPE;
    packageType = PACKAGE_TYPE;
    washPackages = PromotionService.washPackageKeys;
    detailPackages = PromotionService.detailPackageKeys;



    // For initialization
    currentDate: Date;
    startDate: Date;

    error: string;

    private static initPromotion(): Promotion {
        return new Promotion(
            '',
            '',
            '',
            FREQUENCY_TYPE.ONE_TIME,
            null,
            '',
            '',
            PACKAGE_TYPE.WASH,
            [],
            new Discount(),
            '',
            '',
            false,
            true
        )
    }

    constructor(private atpService: AmazingTimePickerService, private snackBar: MatSnackBar,
                private packageService: PackageService, private promotionService: PromotionService) {

        // Initialize barebones Promotion
        this.focusPromotion = PromoFormComponent.initPromotion();

        // Initialize forms using barebones Promotion object
        this.packageTypeFormGroup = this.promotionService.generatePackageTypeForm(this.focusPromotion);
        this.nameFormGroup = this.promotionService.generateNameForm(this.focusPromotion);
        this.descriptionFormGroup = this.promotionService.generateDescriptionForm(this.focusPromotion);
        this.frequencyFormGroup = this.promotionService.generateFrequencyForm(this.focusPromotion);
        this.discountFormGroup = this.promotionService.generateDiscountForm(this.focusPromotion);
        this.packageFormGroup = this.promotionService.generateDiscountPackagesForm(this.focusPromotion);
        this.activeTimeFormGroup = this.promotionService.generateActiveTimeForm(this.focusPromotion);

        // For Amazing Time Picker
        this.currentDate = new Date();
        this.startDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDay());
    }

    ngOnInit() {
        this.getAllPackageItems();
    }


    getAllPackageItems() {
        this.packageService.fetchAllWashPackageItems()
            .subscribe(packageItems => this.packageItems = packageItems,
                error => this.error = error
            );
    }

    fillForm(promo: Promotion) {
        this.focusPromotion = promo;

        this.packageTypeFormGroup.patchValue({
            packageType: this.focusPromotion.packageType
        });

        this.nameFormGroup.setValue({
            name: this.focusPromotion.name
        });

        this.descriptionFormGroup.setValue({
            description: this.focusPromotion.description
        });

        this.frequencyFormGroup.setValue({
            freqType: this.focusPromotion.frequencyType,
            frequency: this.focusPromotion.frequency,
            startDate: this.focusPromotion.startDate,
            endDate: this.focusPromotion.endDate
        });

        this.discountFormGroup.setValue({
            discountType: this.focusPromotion.discount.discountType,
            discountAmt: this.focusPromotion.discount.discountAmount,
            discountFeatures: this.focusPromotion.discount.discountFeatures
        });

        this.packageFormGroup.patchValue([{
            discountPackages: this.focusPromotion.discountPackages
        }]);

        this.activeTimeFormGroup.setValue({
            startTime: this.focusPromotion.startTime,
            endTime: this.focusPromotion.endTime,
            allDay: this.focusPromotion.isAllDay
        });
    }

    discardForm() {
        this.focusPromotion = this.promotions[0];
    }

    createPromo(promo: Promotion) {
        this.promotions.push(promo);
        this.discardForm();
        this.openSnackBar(promo.name + ' Promo', 'Created');
        /*        this.promotionService.newPromotion(focusPromotion)
                    .subscribe(_promo => this.promotions.push(_promo));*/
    }

    editPromo(promo: Promotion) {
        this.fillForm(promo);
    }

    newPromo() {
        this.clearForm();
    }

    updatePromo(promo: Promotion) {
        const promoIndex = this.promotions.indexOf(promo);
        this.promotions.push(promo);
        this.focusPromotion = this.promotions[promoIndex];
        this.openSnackBar(promo.name + ' Promo', 'Updated');
/*        this.promotionService.updatePromotion(focusPromotion)
            .subscribe(_promo => this.promotions.push(_promo));*/
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 4000,
        });
    }

    clearForm() {
        this.focusPromotion = PromoFormComponent.initPromotion();
        this.fillForm(PromoFormComponent.initPromotion());
    }
}

