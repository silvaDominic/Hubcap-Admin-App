"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dashboard_component_1 = require("../../dashboard/dashboard.component");
var user_profile_component_1 = require("../../user-profile/user-profile.component");
var package_manager_component_1 = require("../../package-manager/package-manager.component");
var icons_component_1 = require("../../icons/icons.component");
var notifications_component_1 = require("../../notifications/notifications.component");
var promo_manager_component_1 = require("../../promo-manager/promo-manager.component");
exports.AdminLayoutRoutes = [
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent },
    { path: 'user-profile', component: user_profile_component_1.UserProfileComponent },
    { path: 'package-manager', component: package_manager_component_1.PackageManagerComponent },
    { path: 'promo-manager', component: promo_manager_component_1.PromoManagerComponent },
    { path: 'icons', component: icons_component_1.IconsComponent },
    { path: 'notifications', component: notifications_component_1.NotificationsComponent },
];
//# sourceMappingURL=admin-layout.routing.js.map