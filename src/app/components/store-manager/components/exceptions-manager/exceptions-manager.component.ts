import {Component, Input, OnInit} from '@angular/core';
import {HoursException} from '../../shared/models/hours-exception.model';
import {FormArray, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-exceptions-manager',
  templateUrl: './exceptions-manager.component.html',
  styleUrls: ['./exceptions-manager.component.scss']
})
export class ExceptionsManagerComponent implements OnInit {

  @Input() exceptions: HoursException[];

  constructor() {
  }

  ngOnInit() {
  }

}
