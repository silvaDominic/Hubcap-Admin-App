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
  public focusPromotion: Promotion;

  constructor(private promotionService: PromotionService) {}

  ngOnInit() {
    this.showAllPromotions();
  }

  setFocusPromotion(_promotion: Promotion) {
    this.focusPromotion = _promotion;
  }

  showAllPromotions() {
    this.promotionService.getAllPromotions()
        .subscribe(promotions => this.promotions = promotions,
            error => this.error = error,
            () => this.setFocusPromotion(this.promotions[0])
        );
  }

}
