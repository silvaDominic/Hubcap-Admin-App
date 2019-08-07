import { Component, OnInit } from '@angular/core';
import {PromotionService} from '../_shared/services/promotion.service';
import {CarwashService} from '../_shared/services/carwash.service';

@Component({
    selector: 'app-promo-manager',
    templateUrl: './promo-manager.component.html',
    styleUrls: ['./promo-manager.component.scss'],
    providers: [PromotionService]
})
export class PromoManagerComponent implements OnInit {

    constructor(private readonly promotionService: PromotionService, private readonly carwashService: CarwashService) {}

    ngOnInit() {
        this.promotionService.stageTemplatePromotion();

    }

    public setFocusPromotion(id: string) {
        this.promotionService.stagePromotion(id);
    }
}
