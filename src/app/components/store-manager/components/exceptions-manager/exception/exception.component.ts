import {Component, Input, OnInit} from '@angular/core';
import {HoursException} from '../../../../../_shared/models/hours-exception.model';
import {HOURS_EXCEPTION_TYPE} from '../../../../../_shared/enums/HOURS_EXCEPTION_TYPE.model';
import {StoreService} from '../../../../../_shared/services/store.service';

@Component({
    selector: 'app-exception',
    templateUrl: './exception.component.html',
    styleUrls: ['./exception.component.scss']
})
export class ExceptionComponent implements OnInit {

    @Input() thisException: HoursException;
    @Input() exceptions: HoursException[];

    currentDate: Date;
    exceptionDate: Date;

    E_HOURS_EXCEPTION_TYPE = HOURS_EXCEPTION_TYPE;

    constructor(public readonly storeService: StoreService) {
        this.currentDate = new Date();
        this.exceptionDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDay());
    }

    ngOnInit() {
    }

}
