import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {UserCredentials} from '../../sign-in/models/user-credentials.model';
import {User} from '../../user-manager/shared/models/user.model';

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

/*    fetchUser(userCredentials: UserCredentials): boolean {
        // Dummy validation logic
        // Will change with backend
        this.http.get<User>(this.usersURL, userCredentials);
    }*/
}
