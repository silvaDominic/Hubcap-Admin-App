import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {HoursException} from '../../../../../_shared/models/hours-exception.model';
import {StoreService} from '../../../../../_shared/services/store.service';
import {HOURS_EXCEPTION_TYPE} from '../../../../../_shared/enums/HOURS_EXCEPTION_TYPE.model';

@Component({
  selector: 'app-exception-form',
  templateUrl: './exception-form.component.html',
  styleUrls: ['./exception-form.component.scss']
})
export class ExceptionFormComponent implements OnInit {

    @Input() exceptions: HoursException[];
    exceptionForm: FormGroup;
    exceptionType = HOURS_EXCEPTION_TYPE;

    currentDate: Date;
    startDate: Date;

    constructor(private readonly storeService: StoreService) {
        this.exceptionForm = this.storeService.generateExceptionsForm(HoursException.EMPTY_MODEL);

        this.currentDate = new Date();
        this.startDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDay());
    }

    createException(exceptionForm: FormGroup) {
        this.storeService.createException(exceptionForm);
    }

    ngOnInit() {
    }
}
