import {Component, Input, OnInit} from '@angular/core';
import {PackageItem} from '../../shared/package.item.model';
import {PACKAGE_TYPE} from '../../../shared/models/PACKAGE_TYPE.model';
import {Package} from '../../shared/package.model';

@Component({
    selector: 'app-package',
    templateUrl: './package.component.html',
    styleUrls: ['./package.component.scss']
})

export class PackageComponent implements OnInit {
/*    @Input() name: string;
    @Input() price: number;
    @Input() packageItems: PackageItem[];
    @Input() duration: number;
    @Input() thisPackageType: PACKAGE_TYPE;*/

    @Input() focusPackage: Package;

    packageType = PACKAGE_TYPE;

    constructor() {
        //this.focusPackage.type = PACKAGE_TYPE.WASH;
    }

    ngOnInit() {
    }

}
