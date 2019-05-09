import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {AmazingTimePickerService} from 'amazing-time-picker';
import {Exception} from '../../../shared/models/exception.model';
import {StoresService} from '../../../../shared/services/stores.service';
import {HOURS_EXCEPTION_TYPE} from '../../../../shared/models/HOURS_EXCEPTION_TYPE.model';

@Component({
  selector: 'app-exception-form',
  templateUrl: './exception-form.component.html',
  styleUrls: ['./exception-form.component.scss']
})
export class ExceptionFormComponent implements OnInit {

    @Input() exceptions: Exception[];
    exceptionForm: FormGroup;
    exceptionType = HOURS_EXCEPTION_TYPE;

    currentDate: Date;
    startDate: Date;

    static initException(): Exception {
        return new Exception('',
            '',
            '',
            HOURS_EXCEPTION_TYPE.MODIFIED,
            '',
            '')
    }

    constructor(private storeService: StoresService, private atp: AmazingTimePickerService) {
        this.exceptionForm = this.storeService.generateExceptionsForm(ExceptionFormComponent.initException())

        this.currentDate = new Date();
        this.startDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDay());
    }

    ngOnInit() {
    }

    createException() {
        this.exceptions.push(new Exception(
            StoresService.generateExceptionId(),
            this.exceptionForm.get('name').value,
            this.exceptionForm.get('date').value,
            this.exceptionForm.get('exceptionType').value,
            this.exceptionForm.get('openTime').value,
            this.exceptionForm.get('closeTime').value,
        ));
    }
}
