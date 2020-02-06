import {Component, OnInit} from '@angular/core';
import {User} from '../../_shared/models/user.model';
import {UserService} from '../../_core/services/user.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    currentUser: User;
    error: string;

    constructor(private userService: UserService) {}

    public ngOnInit(): void {
        this.userService.isAuthenticated.subscribe(auth => console.log('In Profile, ', auth));
        this.userService.currentUser.subscribe(user => console.log('In Profile, ', user));
    }

    private getCurrentUser(): void {

    }

    public updateProfile(updatedUser: User) {
        // this.userService.updateUser(updatedUser);
    }
}
