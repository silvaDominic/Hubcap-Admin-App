import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {LoginService} from '../shared/services/login.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
    loginForm: FormGroup;
    signUpForm: FormGroup;

    constructor(private loginService: LoginService) {
        this.loginForm = this.loginService.generateLoginForm();
        this.signUpForm = this.loginService.generateSignUpForm();
    }

    ngOnInit() {
    }

    signUp() {

    }

    login() {

    }
}
