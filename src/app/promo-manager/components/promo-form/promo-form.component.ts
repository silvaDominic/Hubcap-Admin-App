import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AmazingTimePickerService} from 'amazing-time-picker';
import {PackageService} from '../../../shared/services/package.service';
import {Promotion} from '../../shared/promotion.model';
import {DISCOUNT_TYPE} from '../../shared/DISCOUNT_TYPE.model';
import {PackageItem} from '../../../package-manager/shared/package.item.model';
import {PromotionService} from '../../../shared/services/promotion.service';
import {FREQUENCY_TYPE} from '../../shared/FREQUENCY_TYPE.model';
import {FREQUENCY} from '../../shared/FREQUENCY.model';

@Component({
  selector: 'app-promo-form',
  templateUrl: './promo-form.component.html',
  styleUrls: ['./promo-form.component.scss']
})
export class PromoFormComponent implements OnInit {
    @Input() focusPromotion: Promotion;

    nameFormGroup: FormGroup;
    descriptionFormGroup: FormGroup;
    frequencyFormGroup: FormGroup;
    lifespanFormGroup: FormGroup;
    discountFormGroup: FormGroup;
    packageFormGroup: FormGroup;
    activeTimeFormGroup: FormGroup;

    discountType = DISCOUNT_TYPE;
    frequencyType = FREQUENCY_TYPE;
    frequency = FREQUENCY;

    packageItems: PackageItem[];

    currentDate: Date;
    startDate: Date;

    error: string;

    constructor(private fb: FormBuilder, private atpService: AmazingTimePickerService,
                private packageService: PackageService, private promotionService: PromotionService) {
        this.currentDate = new Date();
        this.startDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDay());

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

    public printAllForms() {
/*        console.log(this.nameFormGroup.value);
        console.log(this.descriptionFormGroup.value);
        console.log(this.frequencyFormGroup.value);
        console.log(this.discountFormGroup.value);
        console.log(this.packageFormGroup.value);
        console.log(this.activeTimeFormGroup.value);*/

        console.log(this.focusPromotion.discountPackages[0]);
        console.log(this.focusPromotion.discountPackages[1]);
        console.log(this.focusPromotion.discountPackages[2]);
    }

    showAllPackageItems() {
        this.packageService.getAllPackageItems()
            .subscribe(packageItems => this.packageItems = packageItems,
                error => this.error = error
            );
    }

    fillForm(promo: Promotion) {
        console.log('BEFORE');
        this.printAllForms();
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
        console.log('AFTER');
        this.printAllForms();
    }

    ngOnInit() {
        this.showAllPackageItems();
    }
}

