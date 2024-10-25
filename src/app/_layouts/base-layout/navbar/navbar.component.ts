import {Component, OnInit, ElementRef} from '@angular/core';
// import {ROUTES} from '../sidebar/sidebar.component';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {UserService} from '../../../_core/services/user.service';
import {ApiService} from '../../../_core/services/api.service';
import {environment} from '../../../../environments/environment';
import {HttpHeaders, HttpParams} from '@angular/common/http';
import {CONSTANTS} from '../../../_shared/constants';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    private listTitles: any[];
    location: Location;
    mobile_menu_visible: any = 0;
    private toggleButton: any;
    private _sidebarVisible: boolean;

    constructor(location: Location,
                private element: ElementRef,
                private router: Router,
                private userService: UserService,
                private apiService: ApiService) {
        this.location = location;
        this._sidebarVisible = false;
    }

    get sidebarVisible(): boolean {
        return this._sidebarVisible;
    }

    ngOnInit() {
        this.listTitles = this.userService.getAllowedRoutes().filter(listTitle => listTitle);
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.router.events.subscribe((event) => {
            this.sidebarClose();
            const $layer: any = document.getElementsByClassName('close-layer')[0];
            if ($layer) {
                $layer.remove();
                this.mobile_menu_visible = 0;
            }
        });
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this._sidebarVisible = true;
    };

    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this._sidebarVisible = false;
        body.classList.remove('nav-open');
    };

    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        const $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this._sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible === 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            const $layer: any = document.getElementsByClassName('close-layer')[0];
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function () {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function () {
                $toggle.classList.add('toggled');
            }, 430);

            const $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            } else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function () {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function () { // assign a function
                body.classList.remove('nav-open');
                this.mobile_menu_visible = 0;
                $layer.classList.remove('visible');
                setTimeout(function () {
                    $layer.remove();
                    $toggle.classList.remove('toggled');
                }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };

    getTitle() {
        const title = this.location.prepareExternalUrl(this.location.path());

        for (let item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === title) {
                return this.listTitles[item].title;
            }
        }
        return title;
    }

    public logout() {
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', CONSTANTS.DEFAULT_CONTENT_TYPE);
        httpHeaders.set('Authorization', CONSTANTS.TOKEN_KEY_NAME + ' ' + this.userService.getToken()); // { Authorization: Bearer Token [TOKEN] }

        this.userService.purgeAuth();
        this.apiService.post(environment.logout_url, new HttpParams(), httpHeaders);
        // this.router.navigateByUrl('/login')
    }
}
