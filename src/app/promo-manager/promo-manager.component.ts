import { Component, OnInit } from '@angular/core';
import {Promotion} from './shared/promotion.model';
import {PromotionService} from '../shared/services/promotion.service';

@Component({
  selector: 'app-promo-manager',
  templateUrl: './promo-manager.component.html',
  styleUrls: ['./promo-manager.component.scss']
})
export class PromoManagerComponent implements OnInit {
  promotions: Promotion[];
  error: string;

  constructor(private promotionService: PromotionService) {
  }

  ngOnInit() {
    this.getAllPromotions();
  }

  getAllPromotions() {
    this.promotionService.fetchAllPromotions()
        .subscribe(promotions => this.promotions = promotions,
            error => this.error = error,
            () => this.promotionService.focusPromotion = this.promotions[0]
        );
  }

}
