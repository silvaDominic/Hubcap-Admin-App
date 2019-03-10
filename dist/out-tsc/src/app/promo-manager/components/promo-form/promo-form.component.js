"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var PromoFormComponent = /** @class */ (function () {
    function PromoFormComponent(fb, snackBar) {
        this.fb = fb;
        this.snackBar = snackBar;
        this.exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 12 };
        this.exportTime24 = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
        this.currentDate = new Date();
        this.startDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDay());
        this.nameFormGroup = this.fb.group({
            nameCtrl: ['', forms_1.Validators.required]
        });
        this.frequencyFormGroup = this.fb.group({
            freqCtrl: ['', forms_1.Validators.required]
        });
        this.dateFormGroup = this.fb.group({
            datePickerTo: ['', forms_1.Validators.required],
            datePickerFrom: ['', forms_1.Validators.required]
        });
        this.dateFormGroup = this.fb.group({
            timePickerTo: ['', forms_1.Validators.required],
            timePickerFrom: ['', forms_1.Validators.required]
        });
    }
    PromoFormComponent.prototype.onRevert = function () {
        this.exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 12 };
        this.exportTime24 = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
        this.snackBar.open("Revert time to " + this.exportTime.hour + ":" + this.exportTime.minute + " " + this.exportTime.meriden, null, {
            duration: 500,
        });
    };
    PromoFormComponent.prototype.onSubmit = function (time) {
        this.snackBar.open("Saved time " + this.exportTime.hour + ":" + this.exportTime.minute + " " + this.exportTime.meriden, null, {
            duration: 500,
        });
    };
    PromoFormComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PromoFormComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PromoFormComponent.prototype, "frequency", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Date)
    ], PromoFormComponent.prototype, "lifespan", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], PromoFormComponent.prototype, "isStandardDiscount", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], PromoFormComponent.prototype, "percentDiscount", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], PromoFormComponent.prototype, "discountAmount", void 0);
    PromoFormComponent = __decorate([
        core_1.Component({
            selector: 'app-promo-form',
            templateUrl: './promo-form.component.html',
            styleUrls: ['./promo-form.component.scss']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, material_1.MatSnackBar])
    ], PromoFormComponent);
    return PromoFormComponent;
}());
exports.PromoFormComponent = PromoFormComponent;
//# sourceMappingURL=promo-form.component.js.map