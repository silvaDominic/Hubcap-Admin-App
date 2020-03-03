import {Component, OnInit} from '@angular/core';
import {Errors} from '../../../_core/interfaces/errors.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../_core/services/user.service';
import {CONSTANTS} from '../../../_shared/CONSTANTS';
import {RegisterCredentials} from '../../../_shared/interfaces/credentials.interface';
import {Utilities} from '../../../_shared/utilities';

@Component({
    selector: 'app-auth-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    title: string = 'Register';
    errors: Errors = {errors: {}};
    isSubmitting: boolean = false;
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
                    Validators.maxLength(20),
                    Validators.pattern(CONSTANTS.ALPHABET_NORM_VALIDATOR)
                ]
            ],
            'lastName': ['',
                [
                    Validators.required,
                    Validators.maxLength(30),
                    Validators.pattern(CONSTANTS.ALPHABET_NORM_VALIDATOR)
                ]
            ],
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
            ],
            'registryCode': ['',
                [Validators.required,
                    Validators.maxLength(6),
                    Validators.minLength(6)
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
                email: this.registerForm.get('email').value,
                password: this.registerForm.get('password').value,
                registryCode: this.registerForm.get('registryCode').value
            };

            console.log('CREDS: ', credentials);
            this.userService
                .attemptRegistryAuth(credentials).subscribe(
                user => {
                    console.log('NEW User. Redirecting to login');
                    this.isSubmitting = false;
                    alert('You have successfully been registered. Please login to access your account.');
                    this.router.navigateByUrl('/login');

                },
                err => {
                    console.log('ERROR: ', err);
                    this.errors = err;
                    this.isSubmitting = false;
                    alert('Unable to register. Please try again.');
                    this.router.navigateByUrl('/register');
                }
            );
        }
    }
}
