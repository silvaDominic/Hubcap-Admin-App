import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AmazingTimePickerService} from 'amazing-time-picker';
import {MatRadioButton} from '@angular/material';

@Component({
  selector: 'app-promo-form',
  templateUrl: './promo-form.component.html',
  styleUrls: ['./promo-form.component.scss']
})
export class PromoFormComponent implements OnInit {
    @Input() title: string;
    @Input() frequency: string;
    @Input() lifespan: Date;
    @Input() isStandardDiscount: boolean;
    @Input() percentDiscount: number;
    @Input() discountAmount: number;

    nameFormGroup: FormGroup;
    frequencyFormGroup: FormGroup;
    dateFormGroup: FormGroup;
    timeFormGroup: FormGroup;

    currentDate: Date;
    startDate: Date;

    error: string;

    constructor(private fb: FormBuilder, private atpService: AmazingTimePickerService) {
        this.currentDate = new Date();
        this.startDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDay());

        this.nameFormGroup = this.fb.group({
            nameCtrl: ['', Validators.required]
        });

        this.frequencyFormGroup = this.fb.group({
            freqCtrl: ['', Validators.required]
        });

        this.dateFormGroup = this.fb.group({
            datePickerTo: ['', Validators.required],
            datePickerFrom: ['', Validators.required]
        });

        this.dateFormGroup = this.fb.group({
            timePickerTo: ['', Validators.required],
            timePickerFrom: ['', Validators.required]
        });
    }

    open() {
        const amazingTimePicker = this.atpService.open();
        amazingTimePicker.afterClose().subscribe(time => {
            console.log(time);
        });
    }

    ngOnInit() {
    }
}

