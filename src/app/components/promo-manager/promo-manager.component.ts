import { Component, OnInit } from '@angular/core';
import {CarwashService} from '../../_shared/services/carwash.service';
import {PromotionService} from '../../_shared/services/promotion.service';


@Component({
    selector: 'app-promo-manager',
    templateUrl: './promo-manager.component.html',
    styleUrls: ['./promo-manager.component.scss']
})
export class PromoManagerComponent implements OnInit {

    constructor(private readonly promotionService: PromotionService, private readonly carwashService: CarwashService) {}

    ngOnInit() {
        console.log('promo-manager init');
        // this.promotionService.stageTemplatePromotion();
    }

    public setFocusPromotion(index: number) {
        this.promotionService.setPromotion(index);
    }

    public setFocusPromotionById(id: string) {
        this.promotionService.setPromotionById(id);
    }
}
