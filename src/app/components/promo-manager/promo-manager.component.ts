import {Component, OnDestroy, OnInit} from '@angular/core';
import {PromotionService} from '../../_shared/services/promotion.service';
import {SERVICE_TYPE} from '../../_shared/enums/SERVICE_TYPE';


@Component({
    selector: 'app-promo-manager',
    templateUrl: './promo-manager.component.html',
    styleUrls: ['./promo-manager.component.scss']
})
export class PromoManagerComponent implements OnInit, OnDestroy {

    constructor(private readonly promotionService: PromotionService) {}

    public ngOnInit(): void {
        console.log('promo-manager init');
        this.promotionService.loadPackageArray(SERVICE_TYPE.WASH, true);
    }

    public ngOnDestroy(): void {
        if (this.promotionService.creatingNewPromotion) {
            this.promotionService.cancelNewPromotion();
        }
    }
}
