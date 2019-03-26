import {Component, Input, OnInit} from '@angular/core';
import {Promotion} from '../../shared/promotion.model';
import {DISCOUNT_TYPE} from '../../shared/DISCOUNT_TYPE.model';
import {FREQUENCY_TYPE} from '../../shared/FREQUENCY_TYPE.model';

@Component({
  selector: 'app-promo-preview',
  templateUrl: './promo-preview.component.html',
  styleUrls: ['./promo-preview.component.scss']
})
export class PromoPreviewComponent implements OnInit {

  @Input() focusPromotion: Promotion;
  adjustedPrice: number;

  frequencyType = FREQUENCY_TYPE;
  discountType = DISCOUNT_TYPE;

  startTime: string;
  endTime: string;

  constructor() {
    // this.previewFocusPromotion = this.focusPromotion;
    this.startTime = '';
    this.endTime = '';
  }

  ngOnInit() {
      this.startTime = this.formatTime(this.focusPromotion.startTime);
      this.endTime = this.formatTime(this.focusPromotion.endTime);
  }

  changePreview(promo: Promotion) {
    this.focusPromotion = promo;
  }

  formatTime(stringHour: string) {
      let numHour = parseInt(stringHour, 10);
      const suffix = numHour >= 12 ? 'PM':'AM';
      numHour = ((numHour + 11) % 12 + 1);
      return numHour.toString() + suffix;
  }

/*  adjustPrice(discountType: DISCOUNT_TYPE) {
    if (discountType !== this.discountType.FREE) {

    }
  }*/

}
