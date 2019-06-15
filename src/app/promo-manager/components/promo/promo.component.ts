import {Component, Input, OnInit} from '@angular/core';
import {Promotion} from '../../shared/models/promotion.model';
import {PromoFormComponent} from '../promo-form/promo-form.component';
import {FREQUENCY_TYPE} from '../../../shared/models/FREQUENCY_TYPE.model';
import {DISCOUNT_TYPE} from '../../../shared/models/DISCOUNT_TYPE.model';
import {PromoHistoryComponent} from '../promo-history/promo-history.component';
import {PACKAGE_TYPE} from '../../../shared/models/PACKAGE_TYPE.model';
import {ALL_PACKAGES} from '../../../shared/models/ALL_PACKAGES.model';

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
    packageType = PACKAGE_TYPE;
    package = ALL_PACKAGES;

    constructor() {}

    ngOnInit(): void {

    }

    markInactive(promo: Promotion) {
        for (const a_promo of this.historyComp.activePromos) {
            if (a_promo === promo) {
                a_promo.isActive = false;
            }
        }
        // this.promotionService.updatePromotion(focusPromotion);
        this.historyComp.refreshHistory();
    }

    markActive(promo: Promotion) {
        for (const ia_promo of this.historyComp.inActivePromos) {
            if (ia_promo === promo) {
                ia_promo.isActive = true;
            }
        }
        // this.promotionService.updatePromotion(focusPromotion);
        this.historyComp.refreshHistory();
    }

    callEditPromo(promo: Promotion) {
        this.promoForm.editPromo(promo);
    }

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
