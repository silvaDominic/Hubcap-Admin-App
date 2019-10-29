import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AmazingTimePickerService} from 'amazing-time-picker';
import {ALL_PACKAGES} from '../../../../_shared/enums/ALL_PACKAGES.model';
import {PackageService} from '../../../../_shared/services/package.service';
import {FREQUENCY_TYPE} from '../../../../_shared/enums/FREQUENCY_TYPE.model';
import {DisplayPackageItem} from '../../../../_shared/models/display-package-item.model';
import {Promotion} from '../../../../_shared/models/promotion.model';
import {SERVICE_TYPE} from '../../../../_shared/enums/SERVICE_TYPE';
import {MatSnackBar} from '@angular/material';
import {DISCOUNT_TYPE} from '../../../../_shared/enums/DISCOUNT_TYPE.model';
import {PromotionService} from '../../../../_shared/services/promotion.service';
import { Package } from 'app/_shared/models/package.model';


@Component({
  selector: 'app-promo-form',
  templateUrl: './promo-form.component.html',
  styleUrls: ['./promo-form.component.scss']
})
export class PromoFormComponent implements OnInit {

    promotion: Promotion;
    promotions: Promotion[];
    discountPackage: Package[];
    selectedServiceType: SERVICE_TYPE;

    // Form Builder Groups
    promotionForm: FormGroup;

    // Enums
    E_DISCOUNT_TYPE = DISCOUNT_TYPE;
    E_FREQUENCY_TYPE = FREQUENCY_TYPE;
    E_SERVICE_TYPE = SERVICE_TYPE;

    // For initialization
    currentDate: Date;
    startDate: Date;

    error: string;

    constructor(private readonly atpService: AmazingTimePickerService, private readonly snackBar: MatSnackBar,
                private readonly packageService: PackageService, private readonly promotionService: PromotionService) {

        // For Amazing Time Picker
        this.currentDate = new Date();
        this.startDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDay());

        console.log('Time Demo');
        console.log('Time 1: ', this.currentDate.getHours() + ':' + this.currentDate.getMinutes());
        console.log('Time 2: ', this.currentDate.toLocaleTimeString());
    }

    public ngOnInit(): void {
        // Initialize variables
        this.initForm();
    }

    private initForm(): void {
        this.promotionForm = this.promotionService.getForm();
    }

    discardForm() {
        this.promotion = this.promotions[0];
    }

    createPromo() {
        this.promotions.push(this.promotionService.convertFormToModel(this.promotionForm.value)); // FIX THIS
        this.discardForm();
        this.openSnackBar(this.promotion.name + ' Promo', 'Created');
        /*        this.promotionService.newPromotion(promotion)
                    .subscribe(_promo => this.promotions.push(_promo));*/
    }

    newPromo() {
        this.clearForm();
    }

    updatePromo(promo: Promotion) {
        const promoIndex = this.promotions.indexOf(promo);
        this.promotions.push(promo);
        this.promotion = this.promotions[promoIndex];
        this.openSnackBar(promo.name + ' Promo', 'Updated');
/*        this.promotionService.updatePromotion(promotion)
            .subscribe(_promo => this.promotions.push(_promo));*/
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 4000,
        });
    }

    clearForm() {
/*        this.promotion = PromoFormComponent.initPromotion();
        this.fillForm(PromoFormComponent.initPromotion());*/
    }
}

