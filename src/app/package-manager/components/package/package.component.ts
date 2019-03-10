import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {PackageItem} from '../../shared/package.item.model';
import {PackageService} from '../../../shared/services/package.service';

@Component({
    selector: 'app-package',
    templateUrl: './package.component.html',
    styleUrls: ['./package.component.scss']
})

export class PackageComponent implements OnInit {
    @Input() name: string;
    @Input() price: number;
    @Input() packageItems: PackageItem[];

    constructor() {}

    ngOnInit() {
    }

}
