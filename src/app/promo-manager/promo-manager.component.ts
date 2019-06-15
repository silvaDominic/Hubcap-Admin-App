import { Component, OnInit } from '@angular/core';
import {Promotion} from './shared/models/promotion.model';
import {PromotionService} from '../shared/services/promotion.service';
import {PackageService} from '../shared/services/package.service';
import {PackageItem} from '../package-manager/shared/package.item.model';

@Component({
    selector: 'app-promo-manager',
    templateUrl: './promo-manager.component.html',
    styleUrls: ['./promo-manager.component.scss']
})
export class PromoManagerComponent implements OnInit {
    promotions: Promotion[];
    focusPromotion: Promotion;
    packageItems: PackageItem[];

    error: string;

    constructor(private readonly promotionService: PromotionService, private readonly packageService: PackageService) {}

    ngOnInit() {
        this.getAllPromotions();
        this.getAllPackageItems();
    }

    getAllPromotions() {
        this.promotionService.fetchAllPromotions()
            .subscribe(promotions => this.promotions = promotions,
                error => this.error = error,
                () => this.focusPromotion = this.promotions[0]
            );
    }

    getAllPackageItems() {
        this.packageService.fetchAllPackageItems()
            .subscribe(packageItem => this.packageItems = packageItem,
            error => this.error = error
            );
    }
}
