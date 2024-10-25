import {Component, Input, OnInit} from '@angular/core';
import {StoreService} from '../../_shared/services/store.service';

@Component({
    selector: 'app-store-manager',
    templateUrl: './store-manager.component.html',
    styleUrls: ['./store-manager.component.scss']
})
export class StoreManagerComponent implements OnInit {

    @Input() loading: any;

    constructor(public readonly storeService: StoreService) { }

    ngOnInit() {

    }

}
