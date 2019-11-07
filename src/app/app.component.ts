import {Component, OnInit} from '@angular/core';
import {CarwashService} from './_shared/services/carwash.service';
import {UserService} from './_core/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private userService: UserService, private carWashService: CarwashService) {
  }

  public ngOnInit(): void {
      this.carWashService.registerCarwash();
      this.carWashService.registerAllPackageItems();
    // this.userService.populate();
  }
}
