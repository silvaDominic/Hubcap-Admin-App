import {PackageItem} from './package.item.model';

export class Package {
  public id: string;
  public name: string;
  public price: number;
  public packageItems: PackageItem[];

  constructor(id: string, name: string, price: number, packageItems: PackageItem[]) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.packageItems = packageItems;
  }
}
