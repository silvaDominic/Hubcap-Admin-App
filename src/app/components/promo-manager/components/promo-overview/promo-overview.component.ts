import {Component, OnInit} from '@angular/core';
import {SERVICE_TYPE} from '../../../../_shared/enums/SERVICE_TYPE';
import {DISCOUNT_TYPE} from '../../../../_shared/enums/DISCOUNT_TYPE.model';
import {PromotionService} from '../../../../_shared/services/promotion.service';
import {CONSTANTS} from '../../../../_shared/CONSTANTS';
import {PackageService} from '../../../../_shared/services/package.service';

@Component({
    selector: 'app-promo-overview',
    templateUrl: './promo-overview.html',
    styleUrls: ['./promo-overview.component.scss']
})
export class PromoOverviewComponent implements OnInit {

    // Enums and Constants
    E_DISCOUNT_TYPE = DISCOUNT_TYPE;
    E_SERVICE_TYPE = SERVICE_TYPE;
    C_CONSTANTS = CONSTANTS;

    constructor(private readonly promotionService: PromotionService, private readonly packageService: PackageService) {

    }

    ngOnInit() {
        console.log('promo-overview init');
    }
}
