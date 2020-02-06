import {Component, OnInit} from '@angular/core';
import {UserService} from './_core/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private userService: UserService) {
  }

  public ngOnInit(): void {
      this.userService.populate();
  }
}
