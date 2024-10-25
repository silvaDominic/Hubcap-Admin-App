import {Component, OnInit} from '@angular/core';
import {Errors} from '../../../_core/interfaces/errors.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../_core/services/user.service';
import {CONSTANTS} from '../../../_shared/constants';
import {RegisterCredentials} from '../../../_shared/interfaces/credentials.interface';
import {Utilities} from '../../../_shared/utilities';

@Component({
    selector: 'app-auth-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    title = 'Register';
    errors: Errors = {errors: {}};
    isSubmitting = false;
    registerForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private fb: FormBuilder
    ) {

        this.registerForm = this.fb.group({
            'firstName': ['',
                [
                    Validators.required,
                    Validators.maxLength(CONSTANTS.FIRST_NAME_MAX_LENGTH_VALIDATOR),
                    Validators.pattern(CONSTANTS.ALPHABET_NORM_VALIDATOR)
                ]
            ],
            'lastName': ['',
                [
                    Validators.required,
                    Validators.maxLength(CONSTANTS.LAST_NAME_MAX_LENGTH_VALIDATOR),
                    Validators.pattern(CONSTANTS.ALPHABET_NORM_VALIDATOR)
                ]
            ],
            'email': ['',
                [
                    Validators.required,
                    Validators.email
                ]
            ],
            'password': ['',
                [
                    Validators.required,
                    Validators.minLength(CONSTANTS.PASSWORD_MIN_LENGTH_VALIDATOR),
                    Validators.maxLength(CONSTANTS.PASSWORD_MAX_LENGTH_VALIDATOR)
                ]
            ],
            'registryCode': ['',
                [
                    Validators.required,
                    Validators.maxLength(CONSTANTS.REGISTRY_CODE_LENGTH_VALIDATOR),
                    Validators.minLength(CONSTANTS.REGISTRY_CODE_LENGTH_VALIDATOR)
                ]
            ]
        });
    }

    ngOnInit(): void {
    }

    submitForm(): void {
        this.isSubmitting = true;
        this.errors = {errors: {}};

        if (!this.registerForm.valid) {
            alert(
                'Please fill out the remaining fields \n' +

                Utilities.findInvalidControls(this.registerForm).map(
                    control => {
                        return control.toString() + '\n'
                    }
                )
            );
            this.isSubmitting = false;
            return;
        } else if (this.registerForm.valid) {

            const credentials: RegisterCredentials = {
                firstName: this.registerForm.get('firstName').value,
                lastName: this.registerForm.get('lastName').value,
                userName: this.registerForm.get('email').value,
                password: this.registerForm.get('password').value,
                registryCode: this.registerForm.get('registryCode').value
            };

            console.log('CREDS: ', credentials);
            this.userService
                .attemptRegistryAuth(credentials).subscribe({
                next: (user) => {
                    console.log('NEW User. Redirecting to login');
                    this.isSubmitting = false;
                    alert('You have successfully been registered. Please login to access your account.');
                    this.router.navigateByUrl('/login');

                },
                error: (error) => {
                    console.log('ERROR: ', error);
                    this.errors = error;
                    this.isSubmitting = false;
                    alert('Unable to register. Please try again.');
                    this.router.navigateByUrl('/register');
                }
            });
        }
    }
}
