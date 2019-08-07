import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Promotion} from '../../shared/models/promotion.model';
import {DISCOUNT_TYPE} from '../../../_shared/models/DISCOUNT_TYPE.model';
import {FREQUENCY_TYPE} from '../../../_shared/models/FREQUENCY_TYPE.model';
import {SERVICE_TYPE} from '../../../_shared/models/PACKAGE_TYPE.model';
import {ALL_PACKAGES} from '../../../_shared/models/ALL_PACKAGES.model';
import {PromotionService} from '../../../_shared/services/promotion.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-promo-overview',
    templateUrl: './promo-overview.html',
    styleUrls: ['./promo-overview.component.scss']
})
export class PromoOverviewComponent implements OnInit {

    promotion: Promotion;
    // Enums
    E_FREQUENCY_TYPE = FREQUENCY_TYPE;
    E_DISCOUNT_TYPE = DISCOUNT_TYPE;
    E_SERVICE_TYPE = SERVICE_TYPE;
    E_ALL_PACKAGES = ALL_PACKAGES;

    constructor(private readonly promotionService: PromotionService) {

    }

    ngOnInit() {
        // Initialize promotion with Live Promotion
        this.promotionService.livePromotion.subscribe(promotion => this.promotion = promotion);
    }
}
