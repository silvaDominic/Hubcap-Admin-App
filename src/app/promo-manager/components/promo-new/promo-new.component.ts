import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Promotion} from '../../shared/models/promotion.model';
import {DISCOUNT_TYPE} from '../../../shared/models/DISCOUNT_TYPE.model';
import {FREQUENCY_TYPE} from '../../../shared/models/FREQUENCY_TYPE.model';
import {PACKAGE_TYPE} from '../../../shared/models/PACKAGE_TYPE.model';
import {ALL_PACKAGES} from '../../../shared/models/ALL_PACKAGES.model';

@Component({
    selector: 'app-promo-new',
    templateUrl: './promo-new.component.html',
    styleUrls: ['./promo-new.component.scss']
})
export class PromoNewComponent implements OnInit, AfterViewInit {

    @Input() focusPromotion: Promotion;

    // Enums
    frequencyType = FREQUENCY_TYPE;
    discountType = DISCOUNT_TYPE;
    packageType = PACKAGE_TYPE;
    package = ALL_PACKAGES;

    constructor() {

    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {

    }

}
