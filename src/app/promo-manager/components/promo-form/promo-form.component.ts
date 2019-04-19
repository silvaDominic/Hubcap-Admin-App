import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AmazingTimePickerService} from 'amazing-time-picker';
import {PackageService} from '../../../shared/services/package.service';
import {Promotion} from '../../shared/promotion.model';
import {DISCOUNT_TYPE} from '../../../shared/models/DISCOUNT_TYPE.model';
import {PackageItem} from '../../../package-manager/shared/package.item.model';
import {PromotionService} from '../../../shared/services/promotion.service';
import {FREQUENCY_TYPE} from '../../../shared/models/FREQUENCY_TYPE.model';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-promo-form',
  templateUrl: './promo-form.component.html',
  styleUrls: ['./promo-form.component.scss']
})
export class PromoFormComponent implements OnInit {
    // Dynamic promotion
    @Input() focusPromotion: Promotion;
    @Input() promotions: Promotion[];

    // Form Builder Groups
    nameFormGroup: FormGroup;
    descriptionFormGroup: FormGroup;
    frequencyFormGroup: FormGroup;
    discountFormGroup: FormGroup;
    packageFormGroup: FormGroup;
    activeTimeFormGroup: FormGroup;

    // Enums
    discountType = DISCOUNT_TYPE;
    frequencyType = FREQUENCY_TYPE;

    // Package list for "Free Feature" input
    packageItems: PackageItem[];

    // For initialization
    currentDate: Date;
    startDate: Date;

    isNew: boolean;
    isEdit: boolean;
    error: string;

    constructor(private fb: FormBuilder, private atpService: AmazingTimePickerService, private snackBar: MatSnackBar,
                private packageService: PackageService, private promotionService: PromotionService) {

        this.currentDate = new Date();
        this.startDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDay());

        this.isEdit = false;
        this.isNew = false;
        this.nameFormGroup = this.fb.group({
            nameCtrl: ['', Validators.required]
        });

        this.descriptionFormGroup = this.fb.group({
            descriptionCtrl: ['', Validators.required]
        });

        this.frequencyFormGroup = this.fb.group({
            freqTypeCtrl: ['', Validators.required],
            freqCtrl: ['', Validators.required],
            startDate: ['', Validators.required],
            endDate: ['', Validators.required]
        });

        this.discountFormGroup = this.fb.group({
            discountTypeCtrl: ['', Validators.required],
            discountAmtCtrl: [''],
            discountFeatureCtrl: ['']
        });

        this.packageFormGroup = this.fb.group({
            silverPackageCtrl: [false],
            goldPackageCtrl: [false],
            platinumPackageCtrl: [false]
        });

        this.activeTimeFormGroup = this.fb.group({
            startTime: ['', Validators.required],
            endTime: ['', Validators.required],
            allDayCtrl: [false]
        });
    }

    ngOnInit() {
        this.showAllPackageItems();
    }

    showAllPackageItems() {
        this.packageService.fetchAllWashPackageItems()
            .subscribe(packageItems => this.packageItems = packageItems,
                error => this.error = error
            );
    }

    fillForm(promo: Promotion) {
        this.focusPromotion = promo;

        this.nameFormGroup.setValue({
            nameCtrl: this.focusPromotion.name
        });

        this.descriptionFormGroup.setValue({
            descriptionCtrl: this.focusPromotion.description
        });

        this.frequencyFormGroup.setValue({
            freqTypeCtrl: this.focusPromotion.frequencyType,
            freqCtrl: this.focusPromotion.frequency,
            startDate: this.focusPromotion.startDate,
            endDate: this.focusPromotion.endDate
        });

        this.discountFormGroup.setValue({
            discountTypeCtrl: this.focusPromotion.discount.discountType,
            discountAmtCtrl: this.focusPromotion.discount.discountAmount,
            discountFeatureCtrl: this.focusPromotion.discount.freeFeature
        });

        this.packageFormGroup.patchValue([{
            silverPackageCtrl: this.focusPromotion.discountPackages[0],
            goldPackageCtrl: this.focusPromotion.discountPackages[1],
            platinumPackageCtrl: this.focusPromotion.discountPackages[2]
        }]);

        this.activeTimeFormGroup.setValue({
            startTime: this.focusPromotion.startTime,
            endTime: this.focusPromotion.endTime,
            allDayCtrl: this.focusPromotion.isAllDay
        });
    }

    discardForm() {
        this.promotionService.focusPromotion = this.promotions[0];
        this.isNew = false;
        this.isEdit = false;
    }

    createPromo(promo: Promotion) {
        this.promotions.push(promo);
        this.discardForm();
        this.openSnackBar(promo.name + ' Promo', 'Created');
        /*        this.promotionService.newPromotion(promo)
                    .subscribe(_promo => this.promotions.push(_promo));*/
    }

    editPromo(promo: Promotion) {
        this.isEdit = true;
        this.fillForm(promo);
    }

    newPromo() {
        this.isNew = true;
        this.clearForm();
    }

    updatePromo(promo: Promotion) {
        const promoIndex = this.promotions.indexOf(promo);
        this.promotions.push(promo);
        this.promotionService.focusPromotion = this.promotions[promoIndex];
        this.isEdit = false;
        this.openSnackBar(promo.name + ' Promo', 'Updated');
/*        this.promotionService.updatePromotion(promo)
            .subscribe(_promo => this.promotions.push(_promo));*/
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 4000,
        });
    }

    clearForm() {
        this.promotionService.createNewPromotion();
        this.fillForm(new Promotion());
    }
}

