import {Component, NgZone, OnInit} from '@angular/core';
import {Store} from '../../../../_shared/models/store.model';
import {StoreService} from '../../../../_shared/services/store.service';
import {STATES} from '../../../../_shared/enums/STATES.model';
import {FormGroup} from '@angular/forms';
import {CARWASH_TYPE} from '../../../../_shared/enums/CARWASH_TYPE.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-store',
    templateUrl: './store.component.html',
    styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
    E_STATE_KEYS = Object.keys(STATES);
    E_CARWASH_TYPE_KEYS = Object.keys(CARWASH_TYPE);

    constructor(private readonly storeService: StoreService, private readonly snackBar: MatSnackBar) { }

    ngOnInit() {
    }

    updateStore(updatedStore: Store) {
        this.storeService.updateStore(updatedStore).then((response) => {
            if (response == true) {
                this.openSnackBar(updatedStore.name, 'Created')
            } else {
                alert('Error CREATING ' + updatedStore.name + '.' + ' Try again or contact your Admin.')
            }
        });
    }

    private openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 4000,
        });
    }
}
