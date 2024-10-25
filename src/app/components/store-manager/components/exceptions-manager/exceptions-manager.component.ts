import {Component, Input, OnInit} from '@angular/core';
import {HoursException} from '../../../../_shared/models/hours-exception.model';
import {FormArray, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {StoreService} from '../../../../_shared/services/store.service';

@Component({
    selector: 'app-exceptions-manager',
    templateUrl: './exceptions-manager.component.html',
    styleUrls: ['./exceptions-manager.component.scss']
})
export class ExceptionsManagerComponent implements OnInit {

    constructor(public storeService: StoreService) {
    }

    ngOnInit() {
    }

}
