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
var package_service_1 = require("../package-items/package.service");
var PackageManagerComponent = /** @class */ (function () {
    function PackageManagerComponent(packageService) {
        this.packageService = packageService;
    }
    PackageManagerComponent.prototype.ngOnInit = function () {
        this.showAllPackages();
    };
    PackageManagerComponent.prototype.setFocusPackage = function (_package) {
        this.focusPackage = _package;
    };
    PackageManagerComponent.prototype.showAllPackages = function () {
        var _this = this;
        this.packageService.getAllPackages()
            .subscribe(function (packages) { return _this.packages = packages; }, function (error) { return _this.error = error; }, function () { return _this.setFocusPackage(_this.packages[1]); });
    };
    PackageManagerComponent.prototype.updatePackages = function (updatedPackages) {
        var _this = this;
        this.packageService.updatePackages(updatedPackages)
            .subscribe(function (packages) { return _this.packages = packages; }, function (error) { return _this.error = error; }, function () { return console.log('PACKAGE LIST: ', _this.packages); });
    };
    PackageManagerComponent = __decorate([
        core_1.Component({
            selector: 'app-package-manager',
            templateUrl: './package-manager.component.html',
            styleUrls: ['./package-manager.component.scss'],
            providers: [package_service_1.PackageService]
        }),
        __metadata("design:paramtypes", [package_service_1.PackageService])
    ], PackageManagerComponent);
    return PackageManagerComponent;
}());
exports.PackageManagerComponent = PackageManagerComponent;
//# sourceMappingURL=package-manager.component.js.map