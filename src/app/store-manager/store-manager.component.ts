import { Component, OnInit } from '@angular/core';
import { StoresService } from '../shared/services/stores.service';
import {Store} from './shared/models/store.model';

@Component({
  selector: 'app-store-manager',
  templateUrl: './store-manager.component.html',
  styleUrls: ['./store-manager.component.scss']
})
export class StoreManagerComponent implements OnInit {

  stores: Store[];
  error: string;

  constructor(private storesService: StoresService) { }

  getAllStores() {
    this.storesService.fetchAllStores()
        .subscribe(stores => this.stores = stores,
            error => this.error = error);
  }

  ngOnInit() {
    this.getAllStores();
  }



}
