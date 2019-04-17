import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '../../shared/models/store.model';
import {VEHICLE_TYPE} from '../../../shared/models/VEHICLE_TYPE.model';
import set = Reflect.set;
import {StoresService} from '../../../shared/services/stores.service';
import {ExceptionFormComponent} from './components/exceptions-manager/exception-form/exception-form.component';

@Component({
  selector: 'app-store-form',
  templateUrl: './store-form.component.html',
  styleUrls: ['./store-form.component.scss']
})
export class StoreFormComponent implements OnInit, AfterViewInit {
  storeFormGroup: FormGroup;
  hours: FormArray;
  @Input() stores;

  vehicleKeys = StoresService.vehicleKeys;
  dayKeys = StoresService.dayKeys;

  constructor(private fb: FormBuilder) {

    this.storeFormGroup = this.fb.group({
        nameCtrl: ['', Validators.required],
        addressCtrl: ['', Validators.required],
        phoneCtrl: ['', Validators.required],
        hoursCtrl: [this.fb.array([this.initHours]), Validators.required],
        hoursExceptionsCtrl: [this.fb.array([this.initExceptions]), Validators.required],
        cityCtrl: ['', Validators.required],
        stateCtrl: ['', Validators.required],
        zipCtrl: ['', Validators.required],
        vehicleCtrl: [[''], Validators.required],
        emailCtrl: ['', Validators.email],
        websiteCtrl: ['']
    });

      for (let i = 0; i < this.dayKeys.length; i++) {
          console.log('Looping');
          this.hours = this.storeFormGroup.get('hoursCtrl') as FormArray;
          this.hours.push(this.initHours());
      }

  }

  initHours() {
      const _fb = new FormGroup({
          name: new FormControl('Test', Validators.required),
          isOpen: new FormControl(false, Validators.required),
          openTime: new FormControl('', Validators.required),
          closeTime: new FormControl('', Validators.required),
      });
      console.log(_fb);
      return _fb;
  }

  initExceptions() {
      return this.fb.group({
          nameCtrl: ['', Validators.required],
          exceptionTypeCtrl: ['', Validators.required],
          openTime: ['', Validators.required],
          closeTime: ['', Validators.required]
      });
  }

  addException() {
      const control = <FormArray>this.storeFormGroup.get('hoursExceptionsCtrl');
      control.push(this.initExceptions());
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {

  }

  createStore() {
    const newStore = new Store(
        StoresService.generateStoreId(),
        this.storeFormGroup.get('nameCtrl').value,
        this.storeFormGroup.get('addressCtrl').value,
        this.storeFormGroup.get('cityCtrl').value,
        this.storeFormGroup.get('stateCtrl').value,
        this.storeFormGroup.get('zipCtrl').value,
        this.storeFormGroup.get('emailCtrl').value,
        this.storeFormGroup.get('phoneCtrl').value,
        this.storeFormGroup.get('hoursCtrl').value,
        this.storeFormGroup.get('vehicleCtrl').value,
        this.storeFormGroup.get('websiteCtrl').value
    );
    this.stores.push(newStore);
    console.log('New Store Created: ', newStore);
  }


}
