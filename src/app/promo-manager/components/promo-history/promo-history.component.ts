import {Component, Input, OnInit} from '@angular/core';
import {Promotion} from '../../shared/promotion.model';
import {PromotionService} from '../../../shared/services/promotion.service';
import {PromoFormComponent} from '../promo-form/promo-form.component';
import {PromoPreviewComponent} from '../promo-preview/promo-preview.component';

@Component({
  selector: 'app-promo-history',
  templateUrl: './promo-history.component.html',
  styleUrls: ['./promo-history.component.scss']
})
export class PromoHistoryComponent implements OnInit {

  @Input() historyPromotions: Promotion[];
  @Input() promoForm: PromoFormComponent;
  @Input() promoPreview: PromoPreviewComponent;

  activePromos: Promotion[];
  inActivePromos: Promotion[];

  constructor(private promotionService: PromotionService) {
    this.activePromos = [];
    this.inActivePromos = [];
  }

  ngOnInit() {
    this.refreshHistory();
  }

  getActivePromos() {
    const freshArray = [];
    for (const activePromo of this.historyPromotions) {
      if (activePromo.isActive) {
          freshArray.push(activePromo);
      }
    }
    this.activePromos = freshArray;
    return this.activePromos;
  }

  getInActivePromos() {
      const freshArray = [];
      for (const inActivePromo of this.historyPromotions) {
          if (!inActivePromo.isActive) {
              freshArray.push(inActivePromo);
          }
      }
      this.inActivePromos = freshArray;
      return this.inActivePromos;
  }

  refreshHistory() {
      this.activePromos = this.getActivePromos();
      this.inActivePromos = this.getInActivePromos();
  }

  markInactive(promo: Promotion) {
    for (const a_promo of this.activePromos) {
        if (a_promo === promo) {
            a_promo.isActive = false;
        }
    }
    // this.promotionService.updatePromotion(promo);
    this.refreshHistory();
  }

  markActive(promo: Promotion) {
    for (const i_promo of this.inActivePromos) {
      if (i_promo === promo) {
        i_promo.isActive = true;
      }
    }
    // this.promotionService.updatePromotion(promo);
    this.refreshHistory();
  }

  callChangePreview(promo: Promotion) {
    this.promoPreview.changePreview(promo);
  }

  callFillForm(promo: Promotion) {
    this.promoForm.fillForm(promo);
  }

  trackByFn(index, item) {
      return;
  }
}
