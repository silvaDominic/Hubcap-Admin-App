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

    private getCurrentUser(): void {

    }

    public ngOnInit(): void {
        this.getCurrentUser();
    }

    public updateProfile(updatedUser: User) {
        // this.userService.updateUser(updatedUser);
    }

}
