import {Component, OnInit} from '@angular/core';
import {Promotion} from '../../../../_shared/models/promotion.model';
import {DETAIL_PACKAGE} from '../../../../_shared/enums/DETAIL_PACKAGE.model';
import {WASH_PACKAGE} from '../../../../_shared/enums/WASH_PACKAGE.model';
import {SERVICE_TYPE} from '../../../../_shared/enums/SERVICE_TYPE';
import {DISCOUNT_TYPE} from '../../../../_shared/enums/DISCOUNT_TYPE.model';
import {PromotionService} from '../../../../_shared/services/promotion.service';
import {CONSTANTS} from '../../../../_shared/CONSTANTS';

@Component({
    selector: 'app-promo-overview',
    templateUrl: './promo-overview.html',
    styleUrls: ['./promo-overview.component.scss']
})
export class PromoOverviewComponent implements OnInit {

    promotion: Promotion;
    // Enums and Constants
    E_DISCOUNT_TYPE = DISCOUNT_TYPE;
    E_SERVICE_TYPE = SERVICE_TYPE;
    E_WASH_PACKAGE = WASH_PACKAGE;
    E_DETAIL_PACKAGE = DETAIL_PACKAGE;

    _CONSTANTS = CONSTANTS;

    constructor(private readonly promotionService: PromotionService) {

    }

    ngOnInit() {
        // Initialize promotion with Live Promotion
        this.promotionService.promotion.subscribe(promotion => this.promotion = promotion);
    }
}
