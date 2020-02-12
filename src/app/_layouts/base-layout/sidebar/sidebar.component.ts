import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../_core/services/user.service';

declare const $: any;

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];

    constructor(private readonly userService: UserService) {
    }

    ngOnInit() {
        this.menuItems = this.userService.getAllowedRoutes().filter(menuItem => menuItem);
    }

    isMobileMenu() {
        return $(window).width() <= 991;
    };
}
