import {Component, Input, OnInit} from '@angular/core';
import {Package} from '../../shared/package.model';
import {ITEM_TYPE} from '../../shared/item.type.model';

@Component({
  selector: 'app-package-options',
  templateUrl: './package-options.component.html',
  styleUrls: ['./package-options.component.scss']
})
export class PackageOptionsComponent implements OnInit {
  @Input() focusPackage: Package;
  toggleStyle: boolean;
  itemType = ITEM_TYPE;

  constructor() {
    this.toggleStyle = false;
  }

  ngOnInit() {
  }

    buttonToggle(event, index) {
        event.target.classList.toggle('selected');
        this.focusPackage.packageItems[index].isSelected = this.focusPackage.packageItems[index].isSelected === false;
    }
}
