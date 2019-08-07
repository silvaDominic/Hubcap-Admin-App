import {Component, Input, OnInit} from '@angular/core';
import {Store} from '../../shared/models/store.model';
import {StoresService} from '../../../_shared/services/stores.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  @Input() thisStore: Store;

  vehicleKeys = StoresService.vehicleKeys;
  dayKeys = StoresService.dayKeys;

  constructor() { }

  ngOnInit() {
  }

  updateStore(thisStore: Store) {
    console.log(thisStore, ' updated');
  }

  deleteStore(thisStore: Store) {
    console.log(thisStore, ' deleted');
  }

}
