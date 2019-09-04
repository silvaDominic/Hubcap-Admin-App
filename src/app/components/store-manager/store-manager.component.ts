import { Component, OnInit } from '@angular/core';
import {Store} from './shared/models/store.model';
import {StoresService} from '../../_shared/services/stores.service';

@Component({
    selector: 'app-store-manager',
    templateUrl: './store-manager.component.html',
    styleUrls: ['./store-manager.component.scss']
})
export class StoreManagerComponent implements OnInit {

    stores: Store[];
    error: string;

    constructor(private readonly storesService: StoresService) { }

    ngOnInit() {
        // this.getAllStores();
    }

/*    getAllStores() {
        this.storesService.fetchAllStores()
            .subscribe(stores => this.stores = stores,
                error => this.error = error);
    }*/
}
