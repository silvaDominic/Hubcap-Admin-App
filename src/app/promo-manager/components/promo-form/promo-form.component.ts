import {Component, Input, OnInit} from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AmazingTimePickerService} from 'amazing-time-picker';
import {MatRadioButton} from '@angular/material';
import {PackageService} from '../../../shared/services/package.service';
import {Promotion} from '../../shared/promotion.model';
import {DISCOUNT_TYPE} from '../../shared/DISCOUNT_TYPE.model';
import {PackageItem} from '../../../package-manager/shared/package.item.model';

@Component({
  selector: 'app-promo-form',
  templateUrl: './promo-form.component.html',
  styleUrls: ['./promo-form.component.scss']
})
export class PromoFormComponent implements OnInit {
/*    @Input() title: string;
    @Input() frequency: string;
    @Input() lifespan: Date;
    @Input() isStandardDiscount: boolean;
    @Input() percentDiscount: number;
    @Input() discountAmount: number;*/

    @Input() focusPromotion: Promotion;

    nameFormGroup: FormGroup;
    descriptionFormGroup: FormGroup;
    frequencyFormGroup: FormGroup;
    lifespanFormGroup: FormGroup;
    discountFormGroup: FormGroup;
    packageFormGroup: FormGroup;
    activeTimeFormGroup: FormGroup;

    discountType = DISCOUNT_TYPE;
    show: boolean;

    packageItems: PackageItem[];

    currentDate: Date;
    startDate: Date;

    error: string;

    constructor(private fb: FormBuilder, private atpService: AmazingTimePickerService, private packageService: PackageService) {
        this.currentDate = new Date();
        this.startDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDay());

        this.nameFormGroup = this.fb.group({
            nameCtrl: ['', Validators.required]
        });

        this.descriptionFormGroup = this.fb.group({
            descriptionCtrl: ['', Validators.required]
        });

        this.frequencyFormGroup = this.fb.group({
            freqCtrl: ['', Validators.required]
        });

        this.lifespanFormGroup = this.fb.group({
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
        console.log(this.nameFormGroup.value);
        console.log(this.frequencyFormGroup.value);
        console.log(this.lifespanFormGroup.value);
        console.log(this.discountFormGroup.value);
        console.log(this.packageFormGroup.value);
        console.log(this.activeTimeFormGroup.value);
    }

    showAllPackageItems() {
        this.packageService.getAllPackageItems()
            .subscribe(packageItems => this.packageItems = packageItems,
                error => this.error = error
            );
    }

    toggleForm() {
        this.show = !this.show;
        // TODO Create functionality for switching focusPromotion
    }

    ngOnInit() {
        this.showAllPackageItems();
        this.show = false;
    }
}

