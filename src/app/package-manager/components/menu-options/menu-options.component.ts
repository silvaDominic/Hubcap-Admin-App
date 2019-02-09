import {Component, Input, OnInit} from '@angular/core';
import {Menu} from '../../shared/menu.model';

@Component({
  selector: 'app-menu-options',
  templateUrl: './menu-options.component.html',
  styleUrls: ['./menu-options.component.scss']
})
export class MenuOptionsComponent implements OnInit {
  @Input() focusMenu: Menu;

  constructor() {
  }

  ngOnInit() {

  }
}
