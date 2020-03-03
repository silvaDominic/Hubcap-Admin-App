import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../_core/services/user.service';
import {Errors} from '../../../_core/interfaces/errors.interface';
import {CONSTANTS} from '../../../_shared/CONSTANTS';
import {LoginCredentials, RegisterCredentials} from '../../../_shared/interfaces/credentials.interface';
import {Utilities} from '../../../_shared/utilities';

@Component({
    selector: 'app-auth-page',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    title: string = 'Login';
    errors: Errors = {errors: {}};
    isSubmitting: boolean = false;
    loginForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private fb: FormBuilder
    ) {

        this.loginForm = this.fb.group({
            'email': ['',
                [Validators.required,
                    Validators.email
                ]
            ],
            'password': ['',
                [
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(25)
                ]
            ]
        });
    }

    ngOnInit(): void {
    }

    submitForm(): void {
        this.isSubmitting = true;
        this.errors = {errors: {}};

        if (!this.loginForm.valid) {
            alert(
                'Please fill out the remaining fields \n' +

                Utilities.findInvalidControls(this.loginForm).map(
                    control => {
                        return control.toString() + '\n'
                    }
                )
            );
            this.isSubmitting = false;
            return;
        } else if (this.loginForm.valid) {

            const credentials: LoginCredentials = {
                email: this.loginForm.get('email').value,
                password: this.loginForm.get('password').value,
            };

            console.log('CREDS: ', credentials);
            this.userService
                .attemptLoginAuth(credentials).subscribe(
                user => {
                    console.log('EXISTING User. Redirecting to profile');
                    this.router.navigateByUrl('/profile');
                    this.isSubmitting = false;
                },
                err => {
                    console.log('ERROR: ', err);
                    this.errors = err;
                    this.isSubmitting = false;
                    this.router.navigateByUrl('/login');
                }
            );
        }
    }
}
