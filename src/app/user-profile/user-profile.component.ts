import {Component, OnInit} from '@angular/core';
import {UsersService} from '../shared/services/users.service';
import {User} from '../user-manager/shared/models/user.model';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

    currentUser: User;
    error: string;

    constructor(private userService: UsersService) {}

    private getCurrentUser(): void {
        this.userService.fetchUser()
            .subscribe(user => this.currentUser = user,
                error => this.error = error,
                () => console.log(this.currentUser));
    }

    public ngOnInit(): void {
        this.getCurrentUser();
    }

    public updateProfile(updatedUser: User) {
        this.userService.updateUser(updatedUser);
    }

}
