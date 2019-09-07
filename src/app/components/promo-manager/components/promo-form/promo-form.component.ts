import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AmazingTimePickerService} from 'amazing-time-picker';
import {DETAIL_PACKAGE} from '../../../../_shared/enums/DETAIL_PACKAGE.model';
import {ALL_PACKAGES} from '../../../../_shared/enums/ALL_PACKAGES.model';
import {PackageService} from '../../../../_shared/services/package.service';
import {FREQUENCY_TYPE} from '../../../../_shared/enums/FREQUENCY_TYPE.model';
import {WASH_PACKAGE} from '../../../../_shared/enums/WASH_PACKAGE.model';
import {PackageItem} from '../../../../_shared/models/package.item.model';
import {Promotion} from '../../../../_shared/models/promotion.model';
import {SERVICE_TYPE} from '../../../../_shared/enums/SERVICE_TYPE';
import {MatSnackBar} from '@angular/material';
import {DISCOUNT_TYPE} from '../../../../_shared/enums/DISCOUNT_TYPE.model';
import {PromotionService} from '../../../../_shared/services/promotion.service';


@Component({
  selector: 'app-promo-form',
  templateUrl: './promo-form.component.html',
  styleUrls: ['./promo-form.component.scss']
})
export class PromoFormComponent implements OnInit {

    promotion: Promotion;
    promotions: Promotion[];
    allPackageItems: PackageItem[];

    // Form Builder Groups
    promotionForm: FormGroup;

    // Enums
    E_DISCOUNT_TYPE = DISCOUNT_TYPE;
    E_FREQUENCY_TYPE = FREQUENCY_TYPE;
    E_SERVICE_TYPE = SERVICE_TYPE;
    E_WASH_PACKAGE = WASH_PACKAGE;
    E_DETAIL_PACKAGE = DETAIL_PACKAGE;
    E_ALL_PACKAGES = ALL_PACKAGES;

    OBJECT = Object;

    detailPackages = Object.keys(DETAIL_PACKAGE);
    washPackages = Object.keys(WASH_PACKAGE);

    // For initialization
    currentDate: Date;
    startDate: Date;

    error: string;

    constructor(private atpService: AmazingTimePickerService, private snackBar: MatSnackBar,
                private packageService: PackageService, private promotionService: PromotionService) {



        // For Amazing Time Picker
        this.currentDate = new Date();
        this.startDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDay());
    }

    public ngOnInit(): void {
        // Initialize variables
        this.promotionService.promotion.subscribe(promotion => this.promotion = promotion);
        this.allPackageItems = this.packageService.getAllPackageItems();
        this.initForm();
        console.log(this.promotion.discountPackages);
        for (const p of Object.values(this.E_WASH_PACKAGE)) {
            console.log(p);
        }
        // this.promotions = this.promotionService.getAllPromotions();

    }

    private initForm(): void {
        this.promotionForm = this.promotionService.getForm();
    }

/*    getAllPackageItems() {
        this.packageService.fetchAllWashPackageItems()
            .subscribe(packageItems => this.packageItems = packageItems,
                error => this.error = error
            );
    }*/

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

