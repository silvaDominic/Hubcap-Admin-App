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
var package_model_1 = require("../../shared/package.model");
var item_type_model_1 = require("../../shared/item.type.model");
var PackageOptionsComponent = /** @class */ (function () {
    function PackageOptionsComponent() {
        this.itemType = item_type_model_1.ITEM_TYPE;
        this.toggleStyle = false;
    }
    PackageOptionsComponent.prototype.ngOnInit = function () {
        this.selectedOption = '';
    };
    PackageOptionsComponent.prototype.buttonToggle = function (event, index) {
        event.target.classList.toggle('selected');
        this.focusPackage.packageItems[index].isSelected = this.focusPackage.packageItems[index].isSelected === false;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", package_model_1.Package)
    ], PackageOptionsComponent.prototype, "focusPackage", void 0);
    PackageOptionsComponent = __decorate([
        core_1.Component({
            selector: 'app-package-options',
            templateUrl: './package-options.component.html',
            styleUrls: ['./package-options.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], PackageOptionsComponent);
    return PackageOptionsComponent;
}());
exports.PackageOptionsComponent = PackageOptionsComponent;
//# sourceMappingURL=package-options.component.js.map