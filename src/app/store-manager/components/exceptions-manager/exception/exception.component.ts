import {Component, Input, OnInit} from '@angular/core';
import {AmazingTimePickerService} from 'amazing-time-picker';
import {Exception} from '../../../shared/models/exception.model';
import {HOURS_EXCEPTION_TYPE} from '../../../../shared/models/HOURS_EXCEPTION_TYPE.model';

@Component({
  selector: 'app-exception',
  templateUrl: './exception.component.html',
  styleUrls: ['./exception.component.scss']
})
export class ExceptionComponent implements OnInit {

  @Input() thisException: Exception;
  exceptionType = HOURS_EXCEPTION_TYPE;

  constructor(private atp: AmazingTimePickerService) { }

  ngOnInit() {
  }

    deleteException() {

    }

}
