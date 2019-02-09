import {PackageItem} from './package.item.model';

export class Menu {
  public id: string;
  public name: string;
  public price: number;
  public menuOptions: PackageItem[];

  constructor(name: string, price: number, menuOptions: PackageItem[], id: string) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.menuOptions = menuOptions;
  }
}
