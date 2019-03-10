"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var forms_2 = require("@angular/forms");
var admin_layout_routing_1 = require("./admin-layout.routing");
var dashboard_component_1 = require("../../dashboard/dashboard.component");
var user_profile_component_1 = require("../../user-profile/user-profile.component");
var icons_component_1 = require("../../icons/icons.component");
var notifications_component_1 = require("../../notifications/notifications.component");
var material_1 = require("@angular/material");
var datepicker_1 = require("@angular/material/datepicker");
var amazing_time_picker_1 = require("amazing-time-picker");
var material_time_control_module_1 = require("material-time-control/src/material-time-control.module");
var tabs_1 = require("@angular/material/tabs");
var package_manager_component_1 = require("../../package-manager/package-manager.component");
var package_component_1 = require("../../package-manager/components/package/package.component");
var package_options_component_1 = require("../../package-manager/components/package-options/package-options.component");
var promo_manager_component_1 = require("../../promo-manager/promo-manager.component");
var promo_form_component_1 = require("../../promo-manager/components/promo-form/promo-form.component");
var promo_preview_component_1 = require("../../promo-manager/components/promo-preview/promo-preview.component");
var promo_history_component_1 = require("../../promo-manager/components/promo-history/promo-history.component");
var material_2 = require("@angular/material");
var stepper_1 = require("@angular/material/stepper");
var AdminLayoutModule = /** @class */ (function () {
    function AdminLayoutModule() {
    }
    AdminLayoutModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forChild(admin_layout_routing_1.AdminLayoutRoutes),
                forms_1.FormsModule,
                forms_2.ReactiveFormsModule,
                material_1.MatButtonModule,
                material_1.MatRippleModule,
                material_1.MatFormFieldModule,
                material_1.MatInputModule,
                material_1.MatSelectModule,
                material_1.MatListModule,
                material_1.MatTooltipModule,
                material_1.MatCheckboxModule,
                datepicker_1.MatDatepickerModule,
                material_1.MatNativeDateModule,
                tabs_1.MatTabsModule,
                material_2.MatIconModule,
                stepper_1.MatStepperModule,
                material_1.MatCardModule,
                material_1.MatSnackBarModule,
                material_time_control_module_1.MaterialTimeControlModule,
                amazing_time_picker_1.AmazingTimePickerModule
            ],
            declarations: [
                dashboard_component_1.DashboardComponent,
                package_manager_component_1.PackageManagerComponent,
                package_component_1.PackageComponent,
                package_options_component_1.PackageOptionsComponent,
                promo_manager_component_1.PromoManagerComponent,
                promo_form_component_1.PromoFormComponent,
                promo_preview_component_1.PromoPreviewComponent,
                promo_history_component_1.PromoHistoryComponent,
                user_profile_component_1.UserProfileComponent,
                icons_component_1.IconsComponent,
                notifications_component_1.NotificationsComponent
            ]
        })
    ], AdminLayoutModule);
    return AdminLayoutModule;
}());
exports.AdminLayoutModule = AdminLayoutModule;
//# sourceMappingURL=admin-layout.module.js.map