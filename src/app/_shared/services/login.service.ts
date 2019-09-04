import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    usersURL = 'http://localhost:4200/assets/data/users.json';

    constructor(private readonly fb: FormBuilder, private readonly http: HttpClient) {

    }

    public generateLoginForm(): FormGroup {
        return this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        })
    }

    public generateSignUpForm(): FormGroup {
        return this.fb.group({
            username: ['', Validators.required],
            email: ['', Validators.required, Validators.email],
            password: ['', Validators.required],
            passwordConfirm: ['', Validators.required],
        })
    }
}
