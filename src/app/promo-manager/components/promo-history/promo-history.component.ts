import {Component, Input, OnInit} from '@angular/core';
import {Promotion} from '../../shared/promotion.model';

@Component({
  selector: 'app-promo-history',
  templateUrl: './promo-history.component.html',
  styleUrls: ['./promo-history.component.scss']
})
export class PromoHistoryComponent implements OnInit {

  @Input() historyPromotions: Promotion[];

  constructor() { }

  ngOnInit() {
  }

  getActivePromos() {
    const activePromos = [];
    for (const activePromo of this.historyPromotions) {
      if (activePromo.isActive) {
        activePromos.push(activePromo);
      }
    }
    return activePromos;
  }

  getInActivePromos() {
    const inActivePromos = [];
      for (const inActivePromo of this.historyPromotions) {
          if (!inActivePromo.isActive) {
              inActivePromos.push(inActivePromo);
          }
      }
      return inActivePromos;
  }

}
