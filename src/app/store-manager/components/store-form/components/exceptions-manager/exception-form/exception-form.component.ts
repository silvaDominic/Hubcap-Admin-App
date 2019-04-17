import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AmazingTimePickerService} from 'amazing-time-picker';
import {Exception} from '../../../../../shared/models/exception.model';
import {StoresService} from '../../../../../../shared/services/stores.service';
import {HOURS_EXCEPTION_TYPE} from '../../../../../../shared/models/HOURS_EXCEPTION_TYPE.model';

@Component({
  selector: 'app-exception-form',
  templateUrl: './exception-form.component.html',
  styleUrls: ['./exception-form.component.scss']
})
export class ExceptionFormComponent implements OnInit {

    @Input() parentFormGroup: FormGroup;
    exceptionType = HOURS_EXCEPTION_TYPE;

    constructor(private fb: FormBuilder, private atp: AmazingTimePickerService) {
    }

    ngOnInit() {
    }

    createException() {
        const newException = new Exception(
            StoresService.generateExceptionId(),
            this.parentFormGroup.get('nameCtrl').value,
            this.parentFormGroup.get('exceptionTypeCtrl').value,
            this.parentFormGroup.get('openTime').value,
            this.parentFormGroup.get('closeTime').value,
        );
        console.log('NEW EXCEPTION: ', newException);
    }
}
