import {Component, Input, OnInit} from '@angular/core';
import {PackageItems, PackageItemsService} from '../../../package-items/package.items.service';

@Component({
  selector: 'app-promo-form',
  templateUrl: './promo-form.component.html',
  styleUrls: ['./promo-form.component.scss']
})
export class PromoFormComponent implements OnInit {
    @Input() title: string;
    @Input() frequency: string;
    @Input() dateFrom: Date;
    @Input() dateTo: Date;
    @Input() timeFrom: Date;
    @Input() timeTo: Date;
    @Input() isStandardDiscount: boolean;
    @Input() percentDiscount: number;
    @Input() discountAmount: number;

    packageItems: PackageItems;
    error: string;

    constructor(private packageItemsService: PackageItemsService) {
        this.showPackageItems();
    }

    showPackageItems() {
        this.packageItemsService.getAllPackageItems()
            .subscribe(
                (data: PackageItems) => this.packageItems = { ...data }, // success path
                error => this.error = error // error path
            );
    }

    ngOnInit() {
    }

}
