import {Component, Input, OnInit} from '@angular/core';
import {Promotion} from '../../shared/promotion.model';
import {DISCOUNT_TYPE} from '../../shared/DISCOUNT_TYPE.model';

@Component({
  selector: 'app-promo-preview',
  templateUrl: './promo-preview.component.html',
  styleUrls: ['./promo-preview.component.scss']
})
export class PromoPreviewComponent implements OnInit {

  @Input() focusPromotion: Promotion;
  discountType = DISCOUNT_TYPE;

  constructor() { }

  ngOnInit() {

  }


}
