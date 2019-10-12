import {Component, NgZone, OnInit} from '@angular/core';
import {Store} from '../../../../_shared/models/store.model';
import {StoreService} from '../../../../_shared/services/store.service';
import {STATES} from '../../../../_shared/enums/STATES.model';
import {FormGroup} from '@angular/forms';
import {CARWASH_TYPE} from '../../../../_shared/enums/CARWASH_TYPE.model';

@Component({
    selector: 'app-store',
    templateUrl: './store.component.html',
    styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
    E_STATE_KEYS = Object.keys(STATES);
    E_CARWASH_TYPE_KEYS = Object.keys(CARWASH_TYPE);

    address: Object;

    constructor(private readonly storeService: StoreService) { }

    ngOnInit() {
    }

    updateStore(updatedStore: Store) {
        this.storeService.updateStore(updatedStore);
    }
}
