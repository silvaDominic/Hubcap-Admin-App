import {Component, Input, OnInit} from '@angular/core';
import {Menu} from './shared/menu.model';
import {GOLD_MENU} from './shared/MENU_LIST';
import {MenuList, PackageItemsService} from '../package-items/package.items.service';

@Component({
    selector: 'app-package-manager',
    templateUrl: './package-manager.component.html',
    styleUrls: ['./package-manager.component.scss']
})
export class PackageManagerComponent implements OnInit {
    menuList: MenuList;
    error: string;

    previousMenu: string;
    focusMenu: Menu;

    constructor(private packageItemsService: PackageItemsService) {
        this.previousMenu = null;
        this.focusMenu = GOLD_MENU;
    }

    ngOnInit() {
        this.showAllDefaultMenus();
    }


    setFocusMenu(id: string) {
        for (const menu of this.menuList.menus) {
            if (menu.id === id) {
                this.previousMenu = this.focusMenu.id;
                this.focusMenu = menu;
            }
        }
    }

    showAllDefaultMenus() {
        const _that = this;
        this.packageItemsService.getAllPackageDefaults()
            .subscribe(
                (data: MenuList) => _that.menuList = { ...data }, // success path
                error => this.error = error // error path
            );
    }
}
