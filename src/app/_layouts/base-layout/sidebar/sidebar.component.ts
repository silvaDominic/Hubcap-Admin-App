import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/profile', title: 'Profile',  icon: 'person', class: '' },
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/schedule-manager', title: 'Scheduler', icon: 'calendar_today', class: '' },
    { path: '/store', title: 'My Store', icon: 'store', class: '' },
    { path: '/user-manager', title: 'Users', icon: 'people', class: ''},
    { path: '/package-manager', title: 'Package Manager',  icon: 'view_carousel', class: '' },
    { path: '/promotions-manager', title: 'Promotional Manager',  icon: 'stars', class: '' },
    { path: '/qr-scanner-manager', title: 'QR Scanner', icon: 'control_camera', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  isMobileMenu() {
      return $(window).width() <= 991;
  };
}