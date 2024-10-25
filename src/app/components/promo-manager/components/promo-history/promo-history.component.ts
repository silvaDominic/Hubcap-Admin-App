import {Component, Input, OnInit} from '@angular/core';
import {Promotion} from '../../../../_shared/models/promotion.model';
import {PromotionService} from '../../../../_shared/services/promotion.service';

@Component({
    selector: 'app-promo-history',
    templateUrl: './promo-history.component.html',
    styleUrls: ['./promo-history.component.scss']
})
export class PromoHistoryComponent implements OnInit {

    activePromos: Promotion[];
    inActivePromos: Promotion[];

    constructor(public promotionService: PromotionService) {
        this.activePromos = [];
        this.inActivePromos = [];
    }

    ngOnInit() {
        this.refreshHistory();
    }


    // getActivePromos() {
    //     const freshArray = [];
    //     for (const activePromo of this.historyPromotions) {
    //         if (activePromo.isActive) {
    //             freshArray.push(activePromo);
    //         }
    //     }
    //     this.activePromos = freshArray;
    //     return this.activePromos;
    // }
    //
    // getInActivePromos() {
    //     const freshArray = [];
    //     for (const inActivePromo of this.historyPromotions) {
    //         if (!inActivePromo.isActive) {
    //             freshArray.push(inActivePromo);
    //         }
    //     }
    //     this.inActivePromos = freshArray;
    //     return this.inActivePromos;
    // }

    refreshHistory() {
/*        this.activePromos = this.getActivePromos();
        this.inActivePromos = this.getInActivePromos();*/
    }
}
