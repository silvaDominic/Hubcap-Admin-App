import {Component, OnInit} from '@angular/core';
import {CarwashService} from './_shared/services/carwash.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private carwashService: CarwashService) {}

  public ngOnInit(): void {
    this.carwashService.registerCarwash();
    this.carwashService.registerAllPackageItems();
  }
}
