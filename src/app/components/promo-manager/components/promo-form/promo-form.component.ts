import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {PackageService} from '../../../../_shared/services/package.service';
import {Promotion} from '../../../../_shared/models/promotion.model';
import {SERVICE_TYPE} from '../../../../_shared/enums/SERVICE_TYPE';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DISCOUNT_TYPE} from '../../../../_shared/enums/DISCOUNT_TYPE.model';
import {PromotionService} from '../../../../_shared/services/promotion.service';
import {DAY} from '../../../../_shared/enums/DAY.model';
import {FREQUENCY} from '../../../../_shared/enums/FREQUENCY.model';
import {PROMO_FORM_STEPS} from '../../../../_shared/enums/PROMO_FORM_STEPS.model';


@Component({
  selector: 'app-promo-form',
  templateUrl: './promo-form.component.html',
  styleUrls: ['./promo-form.component.scss']
})
export class PromoFormComponent implements OnInit {

    public promotion: Promotion;
    public promotions: Promotion[];

    // Form Builder Groups
    public promotionForm: FormGroup;
    public isCompleted = [false, false, false, false, false, false, false];

    // Enums
    public E_DISCOUNT_TYPE = DISCOUNT_TYPE;
    public E_FREQUENCY = FREQUENCY;
    public E_SERVICE_TYPE = SERVICE_TYPE;
    public E_PROMO_FORM_STEPS = PROMO_FORM_STEPS;
    public K_DAY = Object.keys(DAY);

    // For initialization
    public currentDate: Date;
    public startDate: Date;

    public error: string;

    constructor(private readonly snackBar: MatSnackBar,
                public readonly packageService: PackageService, public readonly promotionService: PromotionService) {

        // TODO Look into this and decided if you need to delete it
        // For Amazing Time Picker
        this.currentDate = new Date();
        this.startDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDay());
    }

    public ngOnInit(): void {
        // Initialize variables
        this.initForm();
    }

    private initForm(): void {
        this.promotionForm = this.promotionService.getForm();
    }

    createPromotion(promoForm: FormGroup) {
        this.promotionService.createNewPromotion(promoForm).then((res) => {
            // Display success message, if the promotion was successfully posted
            if (res == true) {
                this.openSnackBar(promoForm.get('nameFormGroup.name').value + ' Promo', 'CREATED')
            // Otherwise, display alert
            } else {
                alert('Error CREATING ' + promoForm.get('nameFormGroup.name').value + '.' + ' Try again or contact your Admin.')
            }
        })
    }

    updatePromotion(promoForm: FormGroup) {
        this.promotionService.updatePromotion(promoForm).then((result) => {
            // Display success message, if the promotion was successfully posted
            if (result == true) {
                this.openSnackBar(promoForm.get('nameFormGroup.name').value + ' Promo', 'UPDATED')
                // Otherwise, display alert
            } else {
                alert('Error UPDATING ' + promoForm.get('nameFormGroup.name').value + '.' + ' Try again or contact your Admin.')
            }
        })
    }

    private openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 4000,
        });
    }
}

