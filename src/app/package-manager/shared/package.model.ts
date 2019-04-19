import {PackageItem} from './package.item.model';
import {PACKAGE_TYPE} from '../../shared/models/PACKAGE_TYPE';

export class Package {
  constructor(public id: string,
              public type: PACKAGE_TYPE,
              public name: string,
              public price: number,
              public packageItems: PackageItem[]) {
  }
}
