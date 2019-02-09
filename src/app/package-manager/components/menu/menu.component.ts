import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PackageItem} from '../../shared/package.item.model';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
    @Input() name: string;
    @Input() price: number;
    @Input() menuOptions: string[];
    @Input() subOptions: string[];

    ngOnInit() {
    }
}
