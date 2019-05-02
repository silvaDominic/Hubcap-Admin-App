import { Component, OnInit } from '@angular/core';
import { StoresService } from '../shared/services/stores.service';
import {Store} from './shared/models/store.model';
import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-store-manager',
  templateUrl: './store-manager.component.html',
  styleUrls: ['./store-manager.component.scss']
})
export class StoreManagerComponent implements OnInit {

  stores: Store[];
  error: string;

  storeForm$: Observable<FormGroup> = this.storesService.getStoreForm();

  constructor(private readonly storesService: StoresService) { }

  getAllStores() {
    this.storesService.fetchAllStores()
        .subscribe(stores => this.stores = stores,
            error => this.error = error);
  }

  ngOnInit() {
    this.getAllStores();
  }



}
