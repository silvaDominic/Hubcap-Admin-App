import {Component, Input, OnInit} from '@angular/core';
import {Promotion} from '../../../../_shared/models/promotion.model';
import {PromoFormComponent} from '../promo-form/promo-form.component';
import {PromoHistoryComponent} from '../promo-history/promo-history.component';
import {ALL_PACKAGES} from '../../../../_shared/enums/ALL_PACKAGES.model';
import {FREQUENCY_TYPE} from '../../../../_shared/enums/FREQUENCY_TYPE.model';
import {SERVICE_TYPE} from '../../../../_shared/enums/SERVICE_TYPE';
import {DISCOUNT_TYPE} from '../../../../_shared/enums/DISCOUNT_TYPE.model';

@Component({
    selector: 'app-promo',
    templateUrl: './promo.component.html',
    styleUrls: ['./promo.component.scss']
})
export class PromoComponent implements OnInit {

    @Input() promoForm: PromoFormComponent;
    @Input() historyComp: PromoHistoryComponent;
    @Input() focusPromotion: Promotion;

    frequencyType = FREQUENCY_TYPE;
    discountType = DISCOUNT_TYPE;
    packageType = SERVICE_TYPE;
    package = ALL_PACKAGES;

    constructor() {}

    ngOnInit(): void {

    }

/*    markInactive(promo: Promotion) {
        for (const a_promo of this.historyComp.activePromos) {
            if (a_promo === promo) {
                a_promo.isActive = false;
            }
        }
        // this.promotionService.updatePromotion(promotion);
        this.historyComp.refreshHistory();
    }

    markActive(promo: Promotion) {
        for (const ia_promo of this.historyComp.inActivePromos) {
            if (ia_promo === promo) {
                ia_promo.isActive = true;
            }
        }
        // this.promotionService.updatePromotion(promotion);
        this.historyComp.refreshHistory();
    }*/

    trackByFn(index, item) {
        return;
    }

    formatTime(stringHour: string) {
        let numHour = parseInt(stringHour, 10);
        const suffix = numHour >= 12 ? 'PM' : 'AM';
        numHour = ((numHour + 11) % 12 + 1);
        return numHour.toString() + suffix;
    }
}
