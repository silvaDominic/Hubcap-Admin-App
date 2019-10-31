import {Component, Input, OnInit} from '@angular/core';
import {Promotion} from '../../../../_shared/models/promotion.model';
import {DISCOUNT_TYPE} from '../../../../_shared/enums/DISCOUNT_TYPE.model';
import {PromotionService} from '../../../../_shared/services/promotion.service';
import {CONSTANTS} from '../../../../_shared/CONSTANTS';
import {FREQUENCY} from '../../../../_shared/enums/FREQUENCY.model';

@Component({
    selector: 'app-promo',
    templateUrl: './promo.component.html',
    styleUrls: ['./promo.component.scss']
})
export class PromoComponent implements OnInit {

    @Input() thisPromotion: Promotion;
    @Input() promoIndex: number;
    public step = 0;

    public E_FREQUENCY = FREQUENCY;
    public E_DISCOUNT_TYPE = DISCOUNT_TYPE;
    public C_CONSTANTS = CONSTANTS;

    constructor(private readonly promotionService: PromotionService) {}

    ngOnInit(): void {
    }

    public editPromo(id: string) {
        this.promotionService.setPromotionById(id);
    }

    public toggleActive(id: string) {
        this.promotionService.toggleActive(id);
    }


}
