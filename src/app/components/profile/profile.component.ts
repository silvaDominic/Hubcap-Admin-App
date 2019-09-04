import {Component, OnInit} from '@angular/core';
import {User} from '../../_shared/models/user.model';
import {UsersService} from '../../_shared/services/users.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

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
