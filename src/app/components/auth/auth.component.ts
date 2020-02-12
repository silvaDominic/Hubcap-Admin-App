import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../_core/services/user.service';
import {Errors} from '../../_core/models/errors.interface';

@Component({
    selector: 'app-auth-page',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
    authType: string = '';
    title: string = '';
    errors: Errors = {errors: {}};
    isSubmitting = false;
    loginForm: FormGroup;
    registerForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private fb: FormBuilder
    ) {
        // use FormBuilder to create a form group
        this.loginForm = this.fb.group({
            'email': ['', Validators.required],
            'password': ['', Validators.required],
        });

        this.registerForm = this.fb.group({
            'firstName': ['', Validators.required],
            'lastName': ['', Validators.required],
            'email': ['', Validators.required],
            'password': ['', Validators.required],
            'registryCode': ['']
        })
    }

    ngOnInit(): void {
        this.route.url.subscribe(data => {
            // Get the last piece of the URL (it's either 'login' or 'register')
            this.authType = data[data.length - 1].path;
            // Set a title for the page accordingly
            this.title = (this.authType === 'login') ? 'Log in' : 'Register';
        });
    }

    // TODO Consider changing the logic
    submitForm(): void {
        this.isSubmitting = true;
        this.errors = {errors: {}};

        const credentials = (this.authType == 'login' ? this.loginForm.value : this.registerForm.value);
        this.userService
            .attemptAuth(this.authType, credentials).subscribe(
            data => {
                console.log('Redirecting to profile');
                // Make profile default
                this.router.navigateByUrl('/profile');
            },
            err => {
                console.log('ERROR: ', err);
                this.errors = err;
                this.isSubmitting = false;
                // Redirect back to register/login
            }
        );
    }
}
