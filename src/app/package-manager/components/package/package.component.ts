import {Component, Input, OnInit} from '@angular/core';
import {PackageItem} from '../../shared/package.item.model';
import {PACKAGE_TYPE} from '../../../shared/models/PACKAGE_TYPE.model';

@Component({
    selector: 'app-package',
    templateUrl: './package.component.html',
    styleUrls: ['./package.component.scss']
})

export class PackageComponent implements OnInit {
    @Input() name: string;
    @Input() price: number;
    @Input() packageItems: PackageItem[];
    @Input() duration: number;
    @Input() thisPackageType: PACKAGE_TYPE;

    packageType = PACKAGE_TYPE;

    constructor() {
        this.thisPackageType = PACKAGE_TYPE.WASH;
    }

    ngOnInit() {
    }

}
