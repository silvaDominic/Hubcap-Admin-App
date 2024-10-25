import {Component, OnInit} from '@angular/core';
import {SERVICE_TYPE} from '../../../../_shared/enums/SERVICE_TYPE';
import {DISCOUNT_TYPE} from '../../../../_shared/enums/DISCOUNT_TYPE.model';
import {PromotionService} from '../../../../_shared/services/promotion.service';
import {constants} from '../../../../_shared/constants';
import {PackageService} from '../../../../_shared/services/package.service';
import {FREQUENCY} from '../../../../_shared/enums/FREQUENCY.model';
import {PROMO_FORM_STEPS} from '../../../../_shared/enums/PROMO_FORM_STEPS.model';

@Component({
    selector: 'app-promo-overview',
    templateUrl: './promo-overview.html',
    styleUrls: ['./promo-overview.component.scss']
})
export class PromoOverviewComponent implements OnInit {

    // Enums and Constants
    public E_DISCOUNT_TYPE = DISCOUNT_TYPE;
    public E_SERVICE_TYPE = SERVICE_TYPE;
    public E_FREQUENCY = FREQUENCY;
    public E_PROMO_FORM_STEPS = PROMO_FORM_STEPS;

    public C_CONSTANTS = constants;

    constructor(public readonly promotionService: PromotionService, public readonly packageService: PackageService) {

    }

    ngOnInit() {
        console.log('promo-overview init');
    }
}
